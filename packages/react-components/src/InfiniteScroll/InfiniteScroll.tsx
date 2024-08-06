"use client"
import { useCallback, useRef } from "react"
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import styles from "./InfiniteScroll.module.scss"

export const InfiniteScroll: React.FC<{
  loadMore: () => void
  hasMore: boolean
  children: React.ReactNode
  className: string
}> = ({ loadMore, hasMore, children, className}) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback((node: HTMLDivElement) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore()
      }
    })
    if (node) observer.current?.observe(node)
  }, [loadMore, hasMore])

  return (
    <div className={className}>
      {children}
      {hasMore && (
        <div className={styles.loading} ref={lastElementRef}>
          <AiOutlineLoading3Quarters className="animate-spin" size={20} /> Loading...
        </div>
      )}
    </div>
  );
}