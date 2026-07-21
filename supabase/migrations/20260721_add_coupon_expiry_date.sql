alter table public.sora_adventure_results
add column if not exists coupon_expiry_date date;

alter table public.sora_adventure_results
alter column coupon_expiry_date set default date '2026-10-31';

update public.sora_adventure_results
set coupon_expiry_date = date '2026-10-31'
where coupon_earned = true
  and coupon_expiry_date is null;
