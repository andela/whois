# Andela `who-is` Slack App [![Build Status](https://travis-ci.org/IAMOTZ/whois.svg?branch=develop)](https://travis-ci.org/IAMOTZ/whois)
A slack app in form of [slash command](https://api.slack.com/slash-commands) that helps to collate and present data about Andelans using Andela information services.

## How to use it
The slack app is exposed on [andela-slack-workspace](https://andela.slack.com) through a slash command: `/who-is`. You can use the slack app to get info about both fellows and non-fellows. The slash command also supports the usage of sub-commands.

### Commands and Usage

| Command | Result | Andela API Service |
| --- | --- | --- |
| `/whois <user-handle>` | Get full(profile, bio, skills, placement) details about an Andelan  |  `User`, `Skill` 
| `/whois <user-handle> profile` | Get `profile` of an Andelan | `User` |  
| `/whois <user-handle> bio` | Get `bio` of an Andelan | `User` |
| `/whois <user-handle> skills`| Get `skills` of an Andelan(Fellow only) | `Skill` 
| `/whois <user-handle> placement`| Get `placement` of an Andelan(Fellow only) | `User` |

## How to set it up
If you would like to set up the slack app locally and play-around/contribute to the project, follow the instructions below:
#### Prerequisites:
- [Git](https://git-scm.com/)
- [Node](https://nodejs.org/)
> This app was built with Node version 8.11.1, so ensure you have something similar.
#### Installation(app-server):
- Clone the repository `git clone https://github.com/IAMOTZ/whois.git`
- Change into the root directory of the project
- Use `npm install` to install all the dependency packages
- Create a `.env` file in the root folder to provide all the needed environment variables as specified in `.env.example`
- Use `npm start` to run the app in production mode
- Use `npm run start:dev` to start the app in development mode
- Use `npm run tests` to execute the unit and integration tests.

#### Installation(slack-app):
- Use the instructions [here](https://api.slack.com/slash-commands#creating_commands) to create a slack app with the slash command feature
  - Set the `Request URL` to the `<base-url>/slash-command` of the app server
  - Turn on the `Escape channels, users, and links sent to your app` feature 
- Enable the following [permission scopes](https://api.slack.com/docs/oauth-scopes): `users:read`, `users:read.email`
- Install the app afterwards, instructions [here](https://api.slack.com/slack-apps#installing_apps)
- The slash command should then be accessible in the slack workspace

## Andela Services Utilised
- User Service
- Skill Service

## Contributing
Contributions are highly welcomed, to contribute to this project:
- Fork this repository
- Create a new branch for your contribution in the forked repo, ensure you check out from the `develop` branch.
- Commit your changes with detailed commit messages
- Raise a pull request from your forked repo against the develop branch of this repo.

If you think there is anything that can get better in this project, please feel free to raise a Pull Request.

