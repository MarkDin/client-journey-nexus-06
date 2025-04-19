import { ClientTable } from "@/components/clients/ClientTable";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useClientsData } from "@/hooks/useClientsData";
import { useGoogleAnalytics } from "@/hooks/useGoogleAnalytics";
import { useClientDrawerStore } from "@/store/useClientDrawerStore";
import { useState } from "react";

const Clients = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { clients, isLoading, pagination } = useClientsData({ page: currentPage, pageSize: 10 });
  const openDrawer = useClientDrawerStore(state => state.openDrawer);
  const { trackEvent } = useGoogleAnalytics();

  const handleClientClick = (customerCode: string) => {
    trackEvent('Client', 'View Details', customerCode);
    openDrawer(customerCode);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <AppLayout>
      <PageHeader
        title="Client Management"
        description="Browse, search, and manage your clients"
      />

      <ClientTable
        clients={clients}
        isLoading={isLoading}
        onClientClick={handleClientClick}
      />

      {!isLoading && clients.length > 0 && (
        <div className="py-4 border-t">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                  aria-disabled={currentPage === 1}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>

              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                .filter(page => {
                  // 显示第一页、最后一页，和当前页附近的页码
                  return page === 1 ||
                    page === pagination.totalPages ||
                    Math.abs(page - currentPage) <= 1;
                })
                .map((page, index, array) => {
                  // 如果页码不连续，显示省略号
                  if (index > 0 && page - array[index - 1] > 1) {
                    return (
                      <PaginationItem key={`ellipsis-${page}`}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                  }
                  return (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => handlePageChange(page)}
                        isActive={currentPage === page}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

              <PaginationItem>
                <PaginationNext
                  onClick={() => currentPage < pagination.totalPages && handlePageChange(currentPage + 1)}
                  aria-disabled={currentPage === pagination.totalPages}
                  className={currentPage === pagination.totalPages ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </AppLayout>
  );
};

export default Clients;
