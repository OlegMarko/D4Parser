# Empty JavaScript template

Start a new [web scraping](https://apify.com/web-scraping) project quickly and easily in JavaScript (Node.js) with our empty project template. It provides a basic structure for building an Actor with [Apify SDK](https://docs.apify.com/sdk/js/) and allows you to easily add your own functionality.

## Included features

- **[Apify SDK](https://docs.apify.com/sdk/js/)** - toolkit for building [Actors](https://apify.com/actors)
- **[Crawlee](https://crawlee.dev/)** - web scraping and browser automation library

## How it works

This template is useful when you're already familiar with the [Apify SDK](https://docs.apify.com/sdk/js) and [Crawlee](https://crawlee.dev/) and want to start with a clean slate. It does not include `puppeteer` or `playwright` so install them manually and update the Dockerfile if you need them.

## Resources

- [Node.js tutorials](https://docs.apify.com/academy/node-js) in Academy
- [Video guide on getting data using Apify API](https://www.youtube.com/watch?v=ViYYDHSBAKM)
- [Integration with Make](https://apify.com/integrations), GitHub, Zapier, Google Drive, and other apps
- A short guide on how to create Actors using code templates:

[web scraper template](https://www.youtube.com/watch?v=u-i-Korzf8w)



## Getting started

For complete information [see this article](https://docs.apify.com/platform/actors/development#build-actor-at-apify-console). In short, you will:

1. Build the Actor
2. Run the Actor

## Pull the Actor for local development

If you would like to develop locally, you can pull the existing Actor from Apify console using Apify CLI:

1. Install `apify-cli`

    **Using Homebrew**

    ```bash
    brew install apify-cli
    ```

    **Using NPM**

    ```bash
    npm -g install apify-cli
    ```

2. Pull the Actor by its unique `<ActorId>`, which is one of the following:
    - unique name of the Actor to pull (e.g. "apify/hello-world")
    - or ID of the Actor to pull (e.g. "E2jjCZBezvAZnX8Rb")

    You can find both by clicking on the Actor title at the top of the page, which will open a modal containing both Actor unique name and Actor ID.

    This command will copy the Actor into the current directory on your local machine.

    ```bash
    apify pull <ActorId>
    ```

## Documentation reference

To learn more about Apify and Actors, take a look at the following resources:

- [Apify SDK for JavaScript documentation](https://docs.apify.com/sdk/js)
- [Apify SDK for Python documentation](https://docs.apify.com/sdk/python)
- [Apify Platform documentation](https://docs.apify.com/platform)
- [Join our developer community on Discord](https://discord.com/invite/jyEM2PRvMU)
