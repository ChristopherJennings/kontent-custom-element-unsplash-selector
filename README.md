# Unsplash Selector Kentico Cloud Custom Element

This is a [custom element](https://developer.kenticocloud.com/docs/integrating-content-editing-features) for [Kentico Cloud](https://kenticocloud.com) that allows users to search and select high-quality, royalty-free images from [Unsplash](https://unsplash.com/).

## Quick Setup (for testing)
You can get started quickly using the currently version currently deployed to GitHub Pages. I do not recommend using this for anything other than **quick testing only**.

1. [Get Unsplash application keys](#getting-unsplash-application-keys)
1. Follow the instructions in the [Kentico Cloud documentation](https://developer.kenticocloud.com/docs/integrating-content-editing-features#section-3-displaying-a-custom-element-in-kentico-cloud) to add the element to a content model using <https://christopherjennings.github.io/unsplash-element/> as the `Hosted code URL` and pass your Unsplash keys via the [JSON Parameters configuration](#json-parameters)

## Development Setup

1. Install the latest version of NodeJS and npm. You can download both at <https://nodejs.org/en/download/>.
1. Clone the sample application repository.
1. Navigate to the root folder of the application in the command line.
1. Type `npm install` to install required npm packages.
1. Type `npm run serve` to start a development server.
1. The application is running at <https://localhost:8080/unsplash-element/>.
1. Follow the instructions in the [Kentico Cloud documentation](https://developer.kenticocloud.com/docs/integrating-content-editing-features#section-3-displaying-a-custom-element-in-kentico-cloud) to add the element to a content model.
    * **Note**: the element will now load when editing a content item with it in it, but it will display a message that the Unsplash API keys are not configured. This also provide a tool to create the [proper JSON parameters](#json-parameters) to pass to configure the element.

## Deploying

Assuming you forked this repo in GitHub, you can do a simple deploy to GitHub pages using the included shell script. To use the script make sure you've followed the instructions to [setup for development](#development-setup) and use the `npm run deploy` command to do a build of the project and force the `dist` folder to get pushed to the `gh-pages` branch. After deploying use `https://your-github-user.github.io/unsplash-element/` for the URL when configuring the `Hosted code URL`.

## JSON Parameters

*Debug is optional*

```Json
{
    "accessKey": "YOUR_UNSPLASH_ACCESS_KEY",
    "secretKey": "YOUR_UNSPLASH_SECRET_KEY",
    "debug": true
}
```

## Getting Unsplash Application Keys

1. [Join](https://unsplash.com/join) or [Log in to](https://unsplash.com/login) Unsplash
1. Go to <https://unsplash.com/oauth/applications>
1. Create a new application
1. Open the application and scroll down to find the keys
