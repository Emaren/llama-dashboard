export type MetricDef = {
  key:   string;
  group: 'System Extra' | 'Ops' | 'Data' | string;
  label: string;
  type:  'gauge' | 'number' | 'spark';
  unit?: string;
};

export const METRICS: MetricDef[] = [
  // ───── System Extra ──────────────────────────────────────────
  { key:'gpu_util',   group:'System Extra', label:'GPU Util',     type:'gauge', unit:'%' },
  { key:'vram_util',  group:'System Extra', label:'VRAM Util',    type:'gauge', unit:'%' },
  { key:'disk_r_mb',  group:'System Extra', label:'Disk Read',    type:'number',unit:'MB' },
  { key:'disk_w_mb',  group:'System Extra', label:'Disk Write',   type:'number',unit:'MB' },
  { key:'net_in_mb',  group:'System Extra', label:'Net In',       type:'number',unit:'MB' },
  { key:'net_out_mb', group:'System Extra', label:'Net Out',      type:'number',unit:'MB' },

  // ───── Ops ──────────────────────────────────────────────────
  { key:'cost_cents_query', group:'Ops', label:'Cost / Query',   type:'number',unit:'¢' },
  { key:'cost_usd_day',     group:'Ops', label:'Cost / Day',     type:'number',unit:'$' },
  { key:'retry_rate_pct',   group:'Ops', label:'Retry Rate',     type:'gauge', unit:'%' },
  { key:'timeout_rate_pct', group:'Ops', label:'Timeout Rate',   type:'gauge', unit:'%' },
  { key:'error_rate_pct',   group:'Ops', label:'Error Rate',     type:'gauge', unit:'%' },
  { key:'backlog_len',      group:'Ops', label:'Queue Depth',    type:'number'},
  { key:'sla_pct',          group:'Ops', label:'SLA',            type:'gauge', unit:'%' },
  { key:'uptime_hours',     group:'Ops', label:'Uptime Hours',   type:'number'},
  { key:'build_version',    group:'Ops', label:'Build',          type:'number'},

  // ───── Data ─────────────────────────────────────────────────
  { key:'vector_qps',       group:'Data', label:'Vector QPS',    type:'spark' },
  { key:'memory_kb',        group:'Data', label:'Vector RAM KB', type:'number'},
  { key:'recall_hit_rate',  group:'Data', label:'Recall %',      type:'gauge', unit:'%' },
  { key:'dau',              group:'Data', label:'Daily Active',  type:'number'},
  { key:'latency_p95_ms',   group:'Data', label:'p95 Latency',   type:'spark', unit:'ms' },
];
