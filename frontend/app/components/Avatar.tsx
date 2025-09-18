// import Image from 'next/image'
// import {urlForImage} from '@/sanity/lib/utils'
// import DateComponent from '@/app/components/Date'

// // type Props = {
// //   person: {
// //     firstName: string | null
// //     lastName: string | null
// //     picture?: {
// //       asset?: {
// //         _ref?: string
// //         _id?: string
// //         url?: string | null
// //       }
// //       alt?: string | null
// //     } | null
// //   }
// //   date?: string | null
// //   small?: boolean
// // }

// type AvatarPicture = {
//   alt?: string | null
//   asset?: {
//     _id: string
//     url: string | null
//     metadata?: {
//       lqip?: string | null
//       dimensions?: {width?: number; height?: number} | null
//     } | null
//   } | null
// }

// type Props = {
//   person: {
//     firstName: string | null
//     lastName: string | null
//     picture?: AvatarPicture
//   }
//   date?: string
//   small?: boolean
// }

// export default function Avatar({person, date, small = false}: Props) {
//   const {firstName, lastName, picture} = person
//   const initials = (firstName?.[0] || '') + (lastName?.[0] || '')

//   return (
//     <div className="flex items-center font-mono">
//       <div
//         className={`flex items-center justify-center rounded-full overflow-hidden bg-gray-200 ${small ? 'h-6 w-6 mr-2' : 'h-9 w-9 mr-4'}`}
//       >
//         {picture?.asset?._ref ? (
//           <Image
//             src={person.picture?.asset?.url || ''}
//             alt={picture.alt || `${firstName || ''} ${lastName || ''}`}
//             width={small ? 32 : 48}
//             height={small ? 32 : 48}
//             className="h-full w-full object-cover"
//           />
//         ) : (
//           <span className="text-xs font-semibold text-gray-600">{initials || '?'}</span>
//         )}
//       </div>

//       <div className="flex flex-col">
//         {firstName && lastName && (
//           <div className={`font-bold ${small ? 'text-sm' : ''}`}>
//             {firstName} {lastName}
//           </div>
//         )}
//         {date && (
//           <div className={`text-gray-500 ${small ? 'text-xs' : 'text-sm'}`}>
//             <DateComponent dateString={date} />
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

import Image from 'next/image'
import DateComponent from '@/app/components/Date'

type AvatarPicture = {
  alt?: string | null
  asset?: {
    _id: string
    url: string | null
    metadata?: {
      lqip?: string | null
      dimensions?: {width?: number; height?: number} | null
    }
  } | null
}

type Props = {
  person: {
    firstName: string | null
    lastName: string | null
    picture?: AvatarPicture
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
        className={`${
          small ? 'h-6 w-6 mr-2' : 'h-9 w-9 mr-4'
        } flex items-center justify-center rounded-full bg-gray-200 overflow-hidden`}
      >
        {picture?.asset?.url ? (
          <Image
            src={picture.asset.url}
            alt={picture.alt || `${firstName || ''} ${lastName || ''}`}
            width={small ? 32 : 48}
            height={small ? 32 : 48}
            className="h-full w-full object-cover"
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
