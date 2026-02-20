-- DEMA messages schema + seed

create table if not exists public.dema_messages (
  id bigint generated always as identity primary key,
  message_title text not null,
  decrypted_content text not null,
  threat_level int not null check (threat_level between 1 and 10)
);

alter table public.dema_messages enable row level security;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'dema_messages'
      and policyname = 'Public read dema_messages'
  ) then
    create policy "Public read dema_messages"
      on public.dema_messages
      for select
      to anon, authenticated
      using (true);
  end if;
end
$$;

do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'dema_messages'
  ) then
    alter publication supabase_realtime add table public.dema_messages;
  end if;
end
$$;

insert into public.dema_messages (message_title, decrypted_content, threat_level)
values
  (
    'CLANCY_SIGNAL_01',
    'Clancy confirma una brecha en el perimetro norte de DEMA. Los Obispos han reforzado vigilancia.',
    8
  ),
  (
    'BISHOPS_PROTOCOL_77',
    'Los Obispos interceptaron transmisiones Bandito. Trench permanece activo pero bajo presion.',
    9
  ),
  (
    'VIAL_NODE_RECOVERY',
    'Se detecto un canal secundario con coordenadas hacia refugios de la Resistencia. Clancy sigue en movimiento.',
    7
  )
on conflict do nothing;
