import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import LoadMoreProducts from '@/app/components/listings/LoadMoreProducts'

jest.mock('@/app/components/listings/ProductCard', () => ({
  __esModule: true,
  default: ({item}: {item: {_id: string; title: string}}) => (
    <div data-testid="product-card">{item.title}</div>
  ),
}))

describe('LoadMoreProducts', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    class MockIntersectionObserver {
      observe() {}
      disconnect() {}
      unobserve() {}
    }

    Object.defineProperty(window, 'IntersectionObserver', {
      writable: true,
      configurable: true,
      value: MockIntersectionObserver,
    })
  })

  it('deduplicates appended products and keeps unique ids only', async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        items: [
          {_id: '1', title: 'Initial Product', slug: 'initial-product', excerpt: ''},
          {_id: '2', title: 'New Product', slug: 'new-product', excerpt: ''},
        ],
        hasMore: false,
        nextOffset: 2,
      }),
    })

    global.fetch = fetchMock as unknown as typeof fetch

    render(
      <LoadMoreProducts
        initialItems={[{_id: '1', title: 'Initial Product', slug: 'initial-product', excerpt: ''}]}
        initialHasMore
        initialNextOffset={1}
        locale="en"
        pathPrefix="products"
      />,
    )

    fireEvent.click(screen.getByRole('button', {name: 'Load More'}))

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1)
      expect(screen.getAllByTestId('product-card')).toHaveLength(2)
      expect(screen.getAllByText('Initial Product')).toHaveLength(1)
      expect(screen.getByText('New Product')).toBeInTheDocument()
    })
  })

  it('shows retry state when request fails', async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({}),
    })

    global.fetch = fetchMock as unknown as typeof fetch

    render(
      <LoadMoreProducts
        initialItems={[{_id: '1', title: 'Initial Product', slug: 'initial-product', excerpt: ''}]}
        initialHasMore
        initialNextOffset={1}
        locale="en"
        pathPrefix="products"
      />,
    )

    fireEvent.click(screen.getByRole('button', {name: 'Load More'}))

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(
        'Could not load more products. Please try again.',
      )
      expect(screen.getByRole('button', {name: 'Retry'})).toBeInTheDocument()
    })
  })
})
