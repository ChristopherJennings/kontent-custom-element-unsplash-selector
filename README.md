# Unsplash Selector Custom Element for Kentico Kontent

[![Netlify Status](https://api.netlify.com/api/v1/badges/d32e2b43-8544-4ce4-9587-0c70d4a05e9d/deploy-status)](https://app.netlify.com/sites/kontent-unsplash-selector/deploys)

This is a [custom element](https://docs.kontent.ai/tutorials/develop-apps/integrate/integrating-your-own-content-editing-features) for [Kentico Kontent](https://kontent.ai) that allows users to search and select high-quality, royalty-free images from [Unsplash](https://unsplash.com/).

## Quick testing

If you're interested in trying this out without deploying it yourself, you can use <https://kontent-unsplash-selector.netlify.com/>. This is the deployed version of the master branch in this repo. **This should only be used for quick testing as it is subject to change**

## Deploying

Netlify has made this easy. If you click the deploy button below, it will guide you through the process of deploying it to Netlify and leave you with a copy of the repository in your GitHub account as well.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/ChristopherJennings/kontent-custom-element-unsplash-selector)

## Quick Setup (for testing)
You can get started quickly using the currently version currently deployed to Netlify. I do not recommend using this for anything other than **quick testing only**.

1. Follow the instructions in the [Kentico Kontent documentation](https://docs.kontent.ai/tutorials/develop-apps/integrate/integrating-your-own-content-editing-features#a-3--displaying-a-custom-element-in-kentico-kontent) to add the element to a content model using <https://kontent-unsplash-selector.netlify.com/> as the `Hosted code URL`.

## Development Setup

1. Install the latest version of NodeJS and npm. You can download both at <https://nodejs.org/en/download/>.
1. Clone the sample application repository.
1. Navigate to the root folder of the application in the command line.
1. Type `npm install` to install required npm packages.
1. Type `npm run serve` to start a development server.
1. The application is running at <https://localhost:8080/>.
1. Follow the instructions in the [Kentico Kontent documentation](https://docs.kontent.ai/tutorials/develop-apps/integrate/integrating-your-own-content-editing-features#a-3--displaying-a-custom-element-in-kentico-kontent) to add the element to a content model.

## JSON Parameters

*This is optional*

Debug shows some debug information in the element in the content item view when enabled.

```Json
{
    "debug": true
}
```
