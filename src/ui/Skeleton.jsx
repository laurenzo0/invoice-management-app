export function Skeleton({ width = '100%', height = 16, borderRadius = 8, style = {} }) {
  return (
    <div
      className="skeleton"
      style={{ width, height, borderRadius, ...style }}
      aria-hidden="true"
    />
  )
}

export function InvoiceRowSkeleton() {
  return (
    <div className="skeletonRow" aria-hidden="true">
      <Skeleton width={70} height={14} />
      <Skeleton width={100} height={12} style={{ marginLeft: 24 }} />
      <Skeleton width={80} height={12} style={{ marginLeft: 'auto' }} />
      <Skeleton width={60} height={12} />
      <Skeleton width={104} height={34} borderRadius={8} />
    </div>
  )
}
