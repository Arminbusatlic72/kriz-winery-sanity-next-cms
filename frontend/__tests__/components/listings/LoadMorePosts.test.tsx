import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import LoadMorePosts from '@/app/components/listings/LoadMorePosts'

jest.mock('@/app/components/listings/PostCard', () => ({
  __esModule: true,
  default: ({item}: {item: {_id: string; title: string}}) => (
    <div data-testid="post-card">{item.title}</div>
  ),
}))

describe('LoadMorePosts', () => {
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

  it('deduplicates appended posts and keeps unique ids only', async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        items: [
          {_id: '1', title: 'Initial', slug: 'initial', excerpt: '', date: '2026-03-01'},
          {_id: '2', title: 'New', slug: 'new', excerpt: '', date: '2026-03-02'},
        ],
        hasMore: false,
        nextOffset: 2,
      }),
    })

    global.fetch = fetchMock as unknown as typeof fetch

    render(
      <LoadMorePosts
        initialItems={[
          {_id: '1', title: 'Initial', slug: 'initial', excerpt: '', date: '2026-03-01'},
        ]}
        initialHasMore
        initialNextOffset={1}
        locale="en"
        pathPrefix="posts"
      />,
    )

    fireEvent.click(screen.getByRole('button', {name: 'Load More'}))

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1)
      expect(screen.getAllByTestId('post-card')).toHaveLength(2)
      expect(screen.getAllByText('Initial')).toHaveLength(1)
      expect(screen.getByText('New')).toBeInTheDocument()
    })
  })

  it('shows retry state when request fails', async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({}),
    })

    global.fetch = fetchMock as unknown as typeof fetch

    render(
      <LoadMorePosts
        initialItems={[
          {_id: '1', title: 'Initial', slug: 'initial', excerpt: '', date: '2026-03-01'},
        ]}
        initialHasMore
        initialNextOffset={1}
        locale="en"
        pathPrefix="posts"
      />,
    )

    fireEvent.click(screen.getByRole('button', {name: 'Load More'}))

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(
        'Could not load more posts. Please try again.',
      )
      expect(screen.getByRole('button', {name: 'Retry'})).toBeInTheDocument()
    })
  })
})
