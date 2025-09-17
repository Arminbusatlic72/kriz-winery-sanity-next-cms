import DateComponent from '@/app/components/Date'

type Props = {
  person: {
    firstName: string | null
    lastName: string | null
    picture?: {
      alt?: string
      asset?: {
        _id: string
        url: string
        metadata?: {
          lqip?: string
          dimensions?: {width: number; height: number}
        }
      }
    }
  }
  date?: string | null
  small?: boolean
}

export default function Avatar({person, date, small = false}: Props) {
  const {firstName, lastName, picture} = person
  const initials = (firstName?.charAt(0) || '') + (lastName?.charAt(0) || '')

  return (
    <div className="flex items-center font-mono">
      <div
        className={`${small ? 'h-6 w-6 mr-2' : 'h-9 w-9 mr-4'} flex items-center justify-center rounded-full bg-gray-200 overflow-hidden`}
      >
        {picture?.asset?.url ? (
          <img
            alt={picture?.alt || `${firstName || ''} ${lastName || ''}`}
            className="h-full w-full object-cover"
            height={small ? 32 : 48}
            width={small ? 32 : 48}
            src={picture.asset.url}
          />
        ) : (
          <span className="text-xs font-semibold text-gray-600">{initials || '?'}</span>
        )}
      </div>

      <div className="flex flex-col">
        {firstName && lastName && (
          <div className={`font-bold ${small ? 'text-sm' : ''}`}>
            {firstName} {lastName}
          </div>
        )}
        {date && (
          <div className={`text-gray-500 ${small ? 'text-xs' : 'text-sm'}`}>
            <DateComponent dateString={date} />
          </div>
        )}
      </div>
    </div>
  )
}
