import {defineQuery} from 'next-sanity'

export const settingsQuery = defineQuery(`*[_type == "settings"][0]`)

const sanityImageFields = /* groq */ `
  asset,
  hotspot,
  crop,
  alt,
  "metadata": asset->metadata{
    dimensions {
      width,
      height,
      aspectRatio
    },
    lqip,
    palette
  }
`

const postFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": {
    "en": slug.en.current,
    "hr": slug.hr.current
  },
  excerpt,
  coverImage {
    ${sanityImageFields}
  },
  "date": coalesce(date, _updatedAt),
  "author": author->{firstName, lastName,  picture{
      alt,
      hotspot,
      crop,
      "metadata": asset->metadata{
        dimensions {
          width,
          height,
          aspectRatio
        },
        lqip,
        palette
      },
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      }
    }},
`

const linkReference = /* groq */ `
  _type == "link" => {
    "page": page->slug.current,
    "post": post->slug.current
  }
`

const linkFields = /* groq */ `
  link {
      ...,
      ${linkReference}
      }
`

export const getPageQuery = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0]{
    _id,
    _type,
    name,
    slug,
    heading,
    subheading,
    "pageBuilder": pageBuilder[]{
      ...,
      _type == "callToAction" => {
        ${linkFields},
      },
      _type == "infoSection" => {
        content[]{
          ...,
          markDefs[]{
            ...,
            ${linkReference}
          }
        }
      },
    },
  }
`)

export const sitemapData = defineQuery(`
  *[_type == "page" || _type == "post" && defined(slug.current)] | order(_type asc) {
    "slug": slug.current,
    _type,
    _updatedAt,
  }
`)

export const allPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) {
    ${postFields}
  }
`)

// export const morePostsQuery = defineQuery(`
//   *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
//     ${postFields}
//   }
// `)

export const morePostsQuery = defineQuery(`
  *[
    _type == "post" &&
    !(_id in [$skip, "drafts." + $skip]) &&
    (defined(slug.en.current) || defined(slug.hr.current))
  ] | order(date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
  }
`)

// export const postQuery = defineQuery(`
//   *[_type == "post" && slug.current == $slug] [0] {
//     content[]{
//     ...,
//     markDefs[]{
//       ...,
//       ${linkReference}
//     }
//   },
//     ${postFields}
//   }
// `)

export const postPagesSlugs = defineQuery(`
  *[_type == "post" && (defined(slug.en.current) || defined(slug.hr.current))]{
    "slug": {
      "en": slug.en.current,
      "hr": slug.hr.current
    }
  }
`)

export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)]
  {"slug": slug.current}
`)

// Updated product queries with internationalization support
export const productsQuery = defineQuery(`*[_type == "product"] | order(date asc) {
  _id,
  title,
  description,
  price,
  excerpt,
  content,
  productImage{
    ${sanityImageFields}
  },
  "slug": {
    "en": slug.en.current,
    "hr": slug.hr.current
  },
  date,
  author->{firstName, lastName}
}`)

export const allProductSlugsQuery = defineQuery(`
  *[_type == "product" && (defined(slug.en.current) || defined(slug.hr.current))]{
    "slug": {
      "en": slug.en.current,
      "hr": slug.hr.current
    }
  }
`)

export const productBySlugQuery = defineQuery(`
  *[_type == "product" && (slug.en.current == $slug || slug.hr.current == $slug)][0]{
    _id,
    title,
    description,
    price,
    content,
    excerpt,
    productImage{
      ${sanityImageFields}
    },
    "slug": {
      "en": slug.en.current,
      "hr": slug.hr.current
    },
    date,
    author->{firstName, lastName}
  }
`)

export const productPagesSlugs = defineQuery(`
  *[_type == "product" && (defined(slug.en.current) || defined(slug.hr.current))]{
    "slug": {
      "en": slug.en.current,
      "hr": slug.hr.current
    }
  }
`)

export const productQuery = defineQuery(`
  *[_type == "product" && (slug.en.current == $slug || slug.hr.current == $slug)][0]{
    _id,
    title,
    description,
    content,
    price,
    excerpt,
    productImage{
      ${sanityImageFields}
    },
    "slug": {
      "en": slug.en.current,
      "hr": slug.hr.current
    },
    date,
    author->{firstName, lastName}
  }
`)

// New query for featured products (if you add a featured field)
export const featuredProductsQuery = defineQuery(`
  *[_type == "product" && featured == true] | order(date desc) [0...3] {
    _id,
    title,
    description,
    price,
    productImage{
      ${sanityImageFields}
    },
    "slug": {
      "en": slug.en.current,
      "hr": slug.hr.current
    }
  }
`)

export const searchQuery = defineQuery(`
  *[
    _type == "post" &&
    defined(title) &&
    title match $searchTerm
  ]{
    _id,
    title,
    slug,
    excerpt,
    mainImage {
      ${sanityImageFields}
    }
  }
`)
// Updated product queries with internationalization support
export const postsQuery = defineQuery(`*[_type == "post"] | order(date desc) {
  _id,
  title,
  excerpt,
  content,
  coverImage {
    ${sanityImageFields}
  },
  "slug": {
    "en": slug.en.current,
    "hr": slug.hr.current
  },
  date,
  author->{
    firstName,
    lastName,
     picture{
      alt,
      hotspot,
      crop,
      "metadata": asset->metadata{
        dimensions {
          width,
          height,
          aspectRatio
        },
        lqip,
        palette
      },
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      }
    }

  },
  category->{
    "title": {
      "en": title.en,
      "hr": title.hr
    },
    "slug": {
      "en": slug.en.current,
      "hr": slug.hr.current
    }
  }
}`)
export const postsPagesSlugs = defineQuery(`
  *[_type == "post" && (defined(slug.en.current) || defined(slug.hr.current))]{
    "slug": {
      "en": slug.en.current,
      "hr": slug.hr.current
    }
  }
`)
// export const postQuery = defineQuery(`
//   *[_type == "post" && (slug.en.current == $slug || slug.hr.current == $slug)][0]{
//     _id,
//     title,
//     description,
//     content,
//     price,
//     excerpt,
//     productImage{
//       asset,
//       alt
//     },
//     category->{
//     "title": {
//       "en": title.en,
//       "hr": title.hr
//     },
//     "slug": {
//       "en": slug.en.current,
//       "hr": slug.hr.current
//     },
//     date,
//     author->{firstName, lastName}
//   }
// `)
export const postQuery = defineQuery(`
*[_type == "post" && (slug.en.current == $slug || slug.hr.current == $slug)][0]{
  _id,
  title,
  "slug": {
    "en": slug.en.current,
    "hr": slug.hr.current
  },
  excerpt,
  content,
  coverImage{
    ${sanityImageFields}
  },
  date,
  author->{
    firstName,
    lastName,
    picture{
      alt,
      hotspot,
      crop,
      "metadata": asset->metadata{
        dimensions {
          width,
          height,
          aspectRatio
        },
        lqip,
        palette
      },
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      }
    }
  },
  category->{
    "title": {
      "en": title.en,
      "hr": title.hr
    },
    "slug": {
      "en": slug.en.current,
      "hr": slug.hr.current
    }
  }
}

`)
export const categoriesQuery = defineQuery(`
  *[_type == "category"] | order(title.en asc){
    _id,
    "title": {
      "en": title.en,
      "hr": title.hr
    },
    "slug": {
      "en": slug.en.current,
      "hr": slug.hr.current
    }
  }
  `)



export const postsByCategoryQuery = defineQuery(`
*[
  _type == "post" &&
  category->slug[$locale].current == $category
] | order(publishedAt desc){
  _id,
  "title": title[$locale],
  "slug": slug[$locale].current,
  "excerpt": excerpt[$locale],
  publishedAt,
  coverImage {
    ${sanityImageFields}
  },
  "category": category->{
    _id,
    "title": title[$locale],
    "slug": slug[$locale].current
  }
}
`)

const listingImageFields = /* groq */ `
  alt,
  hotspot,
  crop,
  "metadata": asset->metadata{
    dimensions {
      width,
      height
    },
    lqip
  },
  asset
`

export const paginatedPostsQuery = defineQuery(`
*[
  _type == "post" &&
  (defined(slug.en.current) || defined(slug.hr.current))
] | order(coalesce(date, _updatedAt) desc, _updatedAt desc)[$offset...$end]{
  _id,
  "title": coalesce(title[$locale], title.en, title.hr, "Untitled"),
  "slug": coalesce(slug[$locale].current, slug.en.current, slug.hr.current),
  "excerpt": coalesce(excerpt[$locale], excerpt.en, excerpt.hr, ""),
  "date": coalesce(date, _updatedAt),
  coverImage {
    ${listingImageFields}
  },
  "category": category->{
    "title": coalesce(title[$locale], title.en, title.hr),
    "slug": coalesce(slug[$locale].current, slug.en.current, slug.hr.current)
  }
}
`)

export const paginatedProductsQuery = defineQuery(`
*[
  _type == "product" &&
  (defined(slug.en.current) || defined(slug.hr.current))
] | order(coalesce(date, _updatedAt) desc, _updatedAt desc)[$offset...$end]{
  _id,
  "title": coalesce(title[$locale], title.en, title.hr, "Untitled"),
  "slug": coalesce(slug[$locale].current, slug.en.current, slug.hr.current),
  "excerpt": coalesce(excerpt[$locale], excerpt.en, excerpt.hr, ""),
  productImage {
    ${listingImageFields}
  }
}
`)

export const localizedCategoriesQuery = defineQuery(`
*[_type == "category"] | order(coalesce(title[$locale], title.en, title.hr) asc){
  _id,
  "title": coalesce(title[$locale], title.en, title.hr),
  "slug": coalesce(slug[$locale].current, slug.en.current, slug.hr.current)
}
`)
