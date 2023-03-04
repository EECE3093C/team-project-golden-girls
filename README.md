# Obscene Odds

Obscene odds is a centralized dashboard that provides betting odds along with team/player statistics to help with users making more informed bets on third-party betting applications. **There will be dark mode**. Maybe this whole thing will be dark mode!

See the backend [here.](https://github.com/EECE3093C/team-project-golden-girls-backend).

## Project Description

### Vision

Obscene odds is a dashboard that provides team and player statistics and odds to aid in sports betting. It’s designed for people who are new to betting or those who want to perform their own statistical analyses on players and teams. It solves the problem of information being spread out all over the internet by centralizing it in one place. Since it doesn’t involve human analysts, it also solves the problem of possible bias. It allows less advanced sports betters (that aren’t watching every game) the ability to quickly evaluate a bet based on its odds and how teams or players are currently performing.

### Alternatives and Competitors

Sites like ESPN/NBA official websites provide the ability to view statistics of players and teams for a couple games in the past, but fail to format it in a way that is comprehensive to the average sports better. There are also paid services that provide professional analysis of certain bets and stats to back up the analysis but aren’t services an average bettor would want to pay for. 

### What makes our product different

Most bets are made with a severe lack of insight into the quality of the bet based on previous statistics. The reasoning can often be not knowing where to get the data. Centralizing the data and making it easy for users to filter and sift through the data while also having access to live odds allows users to make, while not perfect bets, much better informed ones.

### Audience

Our target audience is casual sports betters who want all the relevant information condensed into a single, intuitive site. Specifically, we divide our audience into two major groups: (1) individuals that are expereinced with betting who need lots of information to make informed bets and (2) individuals who are new to sports betting and need somewhere to start.

### Objectives/Scope

Our high level objectives are to create a front end with
- A landing page
- An intuitive display for showing relevant stats from recent games
- A display for the odds of different betting sites

and a back end that
- Retrieves statistical data using apis
- Parses that statistical data and serves it to the frontend

Originally, we will design the website to work with NBA statistics and bets, and then, time permitting, we will expand it to include other major sports leagues.

### Architecture

We will be making a web-based app with a frontend and a backend. The frontend will interact with the backend through API calls. We will provide an option to export data/filters/stats to the user’s local computer. We will use React.js for the frontend and Node.js for the backend.


#### AWS S3 Bucket 
<img src="https://obscene-odds-images.s3.us-east-2.amazonaws.com/aws-s3-logo.png" alt="" width="15%" height="15%" title="">

We will be using an AWS S3 Bucket to store images we aren't able to access publicly online such as images we create or edit. We are able to access these images publicly in our code through the following url :
```
https://obscene-odds-images.s3.us-east-2.amazonaws.com/<image-name>
```

### Challenges and Risks

Some challenges we may run into:
- Inexperience with certain project management techniques
- Inexperience with nodejs and React
- Project complexity
- Catering to both an advanced and beginner audience
- Integrating the api information into
- Coordinating the tasks so that all members can meaningfully contribute simultaneously

The single most serious challenge we expect to face is **complexity** in the project formed by interfacing the frontend and backend. We will mitigate this risk by staying on track and adding test cases and documentation. In particular, we will ensure our backend's interface is very thoroughly documented.

### Roles

- **Gareth Fultz** - frontend
- **Nate Louder** - backend
- **Calvin Kinateder** - backend/frontend connection
- **Jimmy German** - frontend

## Setup

There are 3 different dockerfiles:

1. `Dockerfile.dev` - **development** (mounts the current directory)
2. `Dockerfile.prod` - production
3. `Dockerfile.test` - testing

### Development

1. Build the docker image with `docker build -f Dockerfile.dev -t oo-frontend .`
2. Run the image with `docker run --rm -p 3000:3000 --mount type=bind,source="$(pwd)",target="/work" -w "/work" --name oof oo-frontend`

*The `--mount` command may be different for windows systems. If you get an error, it may be because of "$(pwd)". Start [here](https://stackoverflow.com/questions/41485217/mount-current-directory-as-a-volume-in-docker-on-windows-10) for help.*

### Production

1. Build the docker image with `docker build -f Dockerfile.prod -t oo-frontend .`
2. Run the image with `docker run --rm -p 3000:3000 --name oof oo-frontend`

### Testing

1. Build the docker image with `docker build -f Dockerfile.test -t oo-frontend .`
2. Run the image with `docker run --rm -p 3000:3000 --name oof oo-frontend`

For all of the above, you can access the app at `localhost:3000`.

- If you want to run the container in the background, add the `-d` flag
- Kill the process with `Ctrl-c` (in foreground) or `docker kill oof` (in background)