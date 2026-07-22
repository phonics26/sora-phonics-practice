alter table public.sora_adventure_results
add column if not exists line_user_id text;

alter table public.sora_adventure_results
add column if not exists line_connected_at timestamptz;

alter table public.sora_adventure_results
add column if not exists line_coupon_sent_at timestamptz;

alter table public.sora_adventure_results
add column if not exists line_delivery_status text
  not null default 'not_requested';

alter table public.sora_adventure_results
add column if not exists line_delivery_error text;

create index if not exists
sora_adventure_results_line_user_id_idx
on public.sora_adventure_results (line_user_id);

create index if not exists
sora_adventure_results_submission_token_idx
on public.sora_adventure_results (submission_token);
