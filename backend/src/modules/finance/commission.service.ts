import { prisma } from '../../config/prisma';

/**
 * Commission rates — configurable via admin_settings, not hard-coded.
 * Student verified: 16%, T1/T2/T3: 25% (per spec, but admin can change).
 */
export interface CommissionRates {
  student: number; // 16
  t1: number; // 25
  t2: number; // 25
  t3: number; // 25
}

const DEFAULT_RATES: CommissionRates = {
  student: 16,
  t1: 25,
  t2: 25,
  t3: 25,
};

export async function getCommissionRates(): Promise<CommissionRates> {
  try {
    const rows = await prisma.adminSetting.findMany({
      where: {
        settingKey: {
          in: [
            'commission_student_percent',
            'commission_t1_percent',
            'commission_t2_percent',
            'commission_t3_percent',
            'default_platform_commission', // legacy fallback
          ],
        },
      },
    });
    if (rows.length === 0) return DEFAULT_RATES;
    const map = new Map(rows.map((r) => [r.settingKey, r.settingValue]));
    const parse = (k: string, fallback: number) => {
      const v = map.get(k);
      if (!v) return fallback;
      const n = Number(v);
      return Number.isFinite(n) ? n : fallback;
    };
    // If tier-specific not set, fallback to default_platform_commission (25) or DEFAULTS
    const legacy = parse('default_platform_commission', 25);
    return {
      student: parse('commission_student_percent', DEFAULT_RATES.student),
      t1: parse('commission_t1_percent', parse('default_platform_commission', legacy)),
      t2: parse('commission_t2_percent', parse('default_platform_commission', legacy)),
      t3: parse('commission_t3_percent', parse('default_platform_commission', legacy)),
    };
  } catch (e) {
    const err: any = new Error('Commission configuration unavailable');
    err.status = 503;
    err.code = 'CONFIG_UNAVAILABLE';
    err.cause = e;
    throw err;
  }
}

export async function getCommissionRateForProvider(provider: {
  isStudent: boolean;
  studentVerificationStatus: string;
  tier?: { code: string } | null;
  tierCode?: string | null;
}): Promise<number> {
  const rates = await getCommissionRates();
  // Student verified gets 16% regardless of tier (per spec)
  if (provider.isStudent && provider.studentVerificationStatus === 'VERIFIED') {
    return rates.student;
  }
  const code = provider.tier?.code ?? provider.tierCode ?? 'T1';
  if (code === 'STUDENT') return rates.student;
  if (code === 'T1') return rates.t1;
  if (code === 'T2') return rates.t2;
  if (code === 'T3') return rates.t3;
  return rates.t1;
}
