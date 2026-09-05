import { prisma } from '../../config/prisma';

export interface CashCaps {
  student: number; // 500
  t1: number; // 1000
  t2: number; // 1000
  t3: number; // 5000
}

const DEFAULT_CAPS: CashCaps = {
  student: 500,
  t1: 1000,
  t2: 1000,
  t3: 5000,
};

export async function getCashCaps(): Promise<CashCaps> {
  try {
    const rows = await prisma.adminSetting.findMany({
      where: {
        settingKey: { in: ['cash_cap_student', 'cash_cap_t1', 'cash_cap_t2', 'cash_cap_t3'] },
      },
    });
    if (rows.length === 0) return DEFAULT_CAPS;
    const map = new Map(rows.map((r) => [r.settingKey, r.settingValue]));
    const parse = (k: string, fallback: number) => {
      const v = map.get(k);
      if (!v) return fallback;
      const n = Number(v);
      return Number.isFinite(n) ? n : fallback;
    };
    return {
      student: parse('cash_cap_student', DEFAULT_CAPS.student),
      t1: parse('cash_cap_t1', DEFAULT_CAPS.t1),
      t2: parse('cash_cap_t2', DEFAULT_CAPS.t2),
      t3: parse('cash_cap_t3', DEFAULT_CAPS.t3),
    };
  } catch (e) {
    const err: any = new Error('Cash cap configuration unavailable');
    err.status = 503;
    err.code = 'CONFIG_UNAVAILABLE';
    err.cause = e;
    throw err;
  }
}

export async function getCashCapForProvider(provider: {
  isStudent: boolean;
  studentVerificationStatus: string;
  tier?: { code: string } | null;
  tierCode?: string | null;
}): Promise<number> {
  const caps = await getCashCaps();
  if (provider.isStudent && provider.studentVerificationStatus === 'VERIFIED') return caps.student;
  const code = provider.tier?.code ?? provider.tierCode ?? 'T1';
  if (code === 'STUDENT') return caps.student;
  if (code === 'T1') return caps.t1;
  if (code === 'T2') return caps.t2;
  if (code === 'T3') return caps.t3;
  return caps.t1;
}

export interface CashCapCheckResult {
  allowed: boolean;
  outstanding: number;
  cap: number;
  commissionAmount: number;
  wouldBeOutstanding: number;
}

export async function checkCashCap(
  providerId: string,
  grossAmount: number,
  commissionRate: number,
): Promise<CashCapCheckResult> {
  const commissionAmount = Math.round((grossAmount * commissionRate * 100) / 100) / 100; // 2 decimals
  // Need provider to determine cap
  const provider = await prisma.providerProfile.findUnique({
    where: { id: providerId },
    include: { tier: true },
  });
  if (!provider) throw new Error('Provider not found');
  const cap = await getCashCapForProvider(provider as any);
  const account = await prisma.providerCashAccount.findUnique({ where: { providerId } });
  const outstanding = account ? Number(account.outstandingCommission) : 0;
  const wouldBeOutstanding = Math.round((outstanding + commissionAmount) * 100) / 100;
  return {
    allowed: wouldBeOutstanding <= cap,
    outstanding,
    cap,
    commissionAmount,
    wouldBeOutstanding,
  };
}
