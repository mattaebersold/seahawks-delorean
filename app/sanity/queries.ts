import groq from "groq";

export const SETTINGS_QUERY = groq`*[_id == "settings"][0]{ logo{ asset->{ _id, url } }, siteTitle, email, facebookUrl }`;

export const ARTICLE_QUERY = groq`*[_type == "article" && slug.current == $article][0]{ title, content }`;

// Generic card projection for reuse (not a standalone query)
const _genericCardProjection = /* groq */ `
  _key,
  image{
    image{
      asset->{
        _id,
        url
      },
      hotspot,
      crop
    },
    video{
      asset->{
        _id,
        url
      }
    },
    alt
  },
  eyebrow,
  title,
  subtitle,
  buttonText,
  buttonHref
`;

// Shared block projection for base blocks (not a standalone query)
const _baseBlockProjection = /* groq */ `
  _key,
  _type,
  internalTitle,
  blockSpacing,
  disabled,
  hideWhen,
  backgroundColor,
  paddingTop,
  paddingBottom,
  // Copy block fields
  body,
  // Media block fields
  media{
    image{
      asset->{
        _id,
        url
      },
      hotspot,
      crop
    },
    video{
      asset->{
        _id,
        url
      }
    },
    alt
  },
  caption,
  aspectRatio,
  // Stacked carousel / Full card block fields
  eyebrow,
  heading,
  cards[]{
    ${_genericCardProjection}
  },
  // Topics grid block fields
  topics[]->{
    _id,
    title,
    slug,
    description,
    image{
      asset->{
        _id,
        url
      },
      hotspot,
      crop
    }
  },
  // Spacer block fields
  size,
  // Essentials articles block fields
  categorySlug,
  // Form block fields
  formName,
  submitText,
  successMessage,
  fields[]{
    _key,
    label,
    name,
    type,
    placeholder,
    required,
    options
  }
`;

// Block projection including reusable block references (not a standalone query)
const _blockProjection = /* groq */ `
  _key,
  _type,
  internalTitle,
  blockSpacing,
  disabled,
  hideWhen,
  backgroundColor,
  paddingTop,
  paddingBottom,
  // Copy block fields
  body,
  // Media block fields
  media{
    image{
      asset->{
        _id,
        url
      },
      hotspot,
      crop
    },
    video{
      asset->{
        _id,
        url
      }
    },
    alt
  },
  caption,
  aspectRatio,
  eyebrow,
  heading,
  cards[]{
    ${_genericCardProjection}
  },
  // Spacer block fields
  size,
  // Form block fields
  formName,
  submitText,
  successMessage,
  fields[]{
    _key,
    label,
    name,
    type,
    placeholder,
    required,
    options
  },
  // Reusable block reference - dereference and fetch nested blocks
  reusableBlock->{
    _id,
    _type,
    title,
    blocks[]{
      ${_baseBlockProjection}
    }
  }
`;

export const HOME_TOWER_QUERY = groq`*[_type == "tower" && slug.current == "/"][0]{
  _id,
  _type,
  title,
  slug,
  blocks[]{
    ${_blockProjection}
  }
}`;

export const TOWER_QUERY = groq`*[_type == "tower" && slug.current == $tower][0]{
  _id,
  _type,
  title,
  slug,
  blocks[]{
    ${_blockProjection}
  }
}`;


// Reusable blocks queries
export const ALL_REUSABLE_BLOCKS_QUERY = groq`*[_type == "reusableBlock"]{ _id, title }`;

// Home Page singleton query
const _imageWithAsset = /* groq */ `{ asset->{ _id, url }, hotspot, crop }`;
const _buttons = /* groq */ `buttons[]{ _key, text, href, variant }`;

export const HOME_PAGE_QUERY = groq`{
  "homeSection": *[_type == "homeSection"][0]{
    images[]{
      _key,
      image ${_imageWithAsset},
      video{ asset->{ _id, url } }
    },
    title,
    subtitle,
    ${_buttons}
  },
  "aboutSection": *[_type == "aboutSection"][0]{
    image ${_imageWithAsset},
    imageAlt,
    title,
    body,
    ${_buttons}
  },
  "gallerySection": *[_type == "gallerySection"][0]{
    title,
    description,
    images[]{
      _key,
      image ${_imageWithAsset},
      caption
    }
  },
  "historySection": *[_type == "historySection"][0]{
    title,
    description,
    images[]{
      _key,
      image ${_imageWithAsset},
      alt
    }
  },
  "bookSection": *[_type == "bookSection"][0]{
    title,
    body,
    image ${_imageWithAsset}
  }
}`;
