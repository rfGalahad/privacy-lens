import { Fragment } from "react"
import { Link } from "react-router-dom"
import { ChevronRight } from "lucide-react"

interface BreadcrumbItem {
  label: string
  href?: string // omit href for the current/last page
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <Fragment key={item.label}>
              <li className="flex items-center gap-1.5">
                {item.href && !isLast ? (
                  <Link
                    to={item.href}
                    className="text-text-muted transition-colors hover:text-foreground hover:underline"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className={isLast ? "font-bold text-foreground" : ""}
                    aria-current={isLast ? "page" : undefined}
                  >
                    {item.label}
                  </span>
                )}
              </li>
              {!isLast && (
                <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              )}
            </Fragment>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumbs;