# Unsplash Selector Custom Element for Kentico Kontent

This is a [custom element](https://docs.kontent.ai/tutorials/develop-apps/integrate/integrating-your-own-content-editing-features) for [Kentico Kontent](https://kontent.ai) that allows users to search and select high-quality, royalty-free images from [Unsplash](https://unsplash.com/).

## Deploying

Netlify has made this easy. If you click the deploy button below, it will guide you through the process of deploying it to Netlify and leave you with a copy of the repository in your GitHub account as well.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/ChristopherJennings/kontent-custom-element-unsplash-selector)

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
