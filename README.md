<h1 align="center">bmart ⚡️ 4</h1>
<p align="center">🚚 초소량 번쩍배달 B마트를 소개합니다 💨</b></p>

<p align="center">
  <img src="https://img.shields.io/github/license/woowa-techcamp-2020/bmart-4" />
  <a href="https://github.com/woowa-techcamp-2020/bmart-4/actions">
    <img src="https://github.com/woowa-techcamp-2020/bmart-4/workflows/CI/badge.svg" />
  </a>
   <a href="https://github.com/woowa-techcamp-2020/bmart-4/actions">
    <img src="https://github.com/woowa-techcamp-2020/bmart-4/workflows/CD/badge.svg" />
  </a>
  <a href="https://github.com/woowa-techcamp-2020/bmart-4/releases">
    <img src="https://img.shields.io/github/v/release/woowa-techcamp-2020/bmart-4?label=version" />
  </a>
</p>

[![](docs/images/lossy-banner.PNG)](docs/images/banner.PNG)

## 📱 이런 기술들을 사용했어요

| Area         | Tech Stack                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Frontend     | ![](https://img.shields.io/badge/React-blue?longCache=true&logo=React) ![](https://img.shields.io/badge/Typescript-blue?color=007ACC&longCache=true&logo=Typescript&logoColor=white) ![](https://img.shields.io/badge/Styled_Compoenent-blue?color=b80742&longCache=true&logo=styled-components&logoColor=white) ![](https://img.shields.io/badge/Apollo-blue?color=311C87&longCache=true&logo=Apollo-GraphQL&logoColor=white) ![](https://img.shields.io/badge/Google_OAuth_2.0-blue?color=4285F4&longCache=true&logo=Google&logoColor=white) |
| Backend      | ![](https://img.shields.io/badge/Node.js-blue?color=339933&longCache=true&logo=Node.js&logoColor=white) ![](https://img.shields.io/badge/MySQL-blue?color=363c40&longCache=true&logo=MySQL&logoColor=white) ![](https://img.shields.io/badge/GraphQL-blue?color=E10098&longCache=true&logo=GraphQL&logoColor=white) ![](https://img.shields.io/badge/Elastic_Search-blue?color=311C87&longCache=true&logo=Elasticsearch&logoColor=white) ![](https://img.shields.io/badge/NGINX-blue?color=269539&longCache=true&logo=NGINX&logoColor=white)   |
| Infra        | ![](https://img.shields.io/badge/Cloudflare-blue?color=F38020&longCache=true&logo=CloudFlare&logoColor=white) ![](https://img.shields.io/badge/AWS_EC2-blue?color=232F3E&longCache=true&logo=Amazon-AWS&logoColor=white)                                                                                                                                                                                                                                                                                                                       |
| DevOps       | ![](https://img.shields.io/badge/Docker-blue?color=2496ED&longCache=true&logo=Docker&logoColor=white) ![](https://img.shields.io/badge/GitHub-blue?color=181717&longCache=true&logo=GitHub&logoColor=white) ![](https://img.shields.io/badge/GitHub_Actions-blue?color=2088FF&longCache=true&logo=GitHub-Actions&logoColor=white)                                                                                                                                                                                                              |
| Miscellanous | ![](https://img.shields.io/badge/Python-blue?color=3776AB&longCache=true&logo=Python&logoColor=white)                                                                                                                                                                                                                                                                                                                                                                                                                                          |

## 📱 그 기술들은 이렇게 연결되어 있어요

[![](docs/images/lossy-abstract.png)](docs/images/abstract.png)

## 🏃‍♂️Getting Started

```bash
$ git clone https://github.com/woowa-techcamp-2020/bmart-4.git
$ cd bmart-4
```

프로젝트를 내려받습니다


```
$ cd client
```

```
// .env.development
REACT_APP_GRAPHQL_URI=[YOUR_GRAPHQL_API_ENDPOINT]
REACT_APP_SEARCH_URI=[YOUR_SEARCH_API_ENDPOINT]
REACT_APP_GOOGLE_OAUTH_URI=[YOUR_GOOGLE_OAUTH_URI]
REACT_APP_AUTO_SUGGEST_URI=[YOUR_AUTO_SUGGEST_API_ENDPOINT]
```

`/client` 디렉토리에 위와 같이 `.env.development` 파일을 생성합니다

```
$ npm i
```

client에 필요한 npm 패키지들을 설치합니다

```
$ cd ../server
$ mkdir public
```

```
// .env
MYSQL_HOST=
MYSQL_ROOT_PASSWORD=
MYSQL_USER=
MYSQL_PASSWORD=
MYSQL_DATABASE=
MYSQL_PORT=
```

`server` 디렉토리에 위와 같이 `.env` 파일을 생성합니다

```
// .env.dev
MODE=
PORT=
MYSQL_HOST=
MYSQL_ROOT_PASSWORD=
MYSQL_USER=
MYSQL_PASSWORD=
MYSQL_DATABASE=
MYSQL_PORT=
ELASTICSEARCH_ENDPOINT=
ELASTICSEARCH_API_KEY_NEW=
GOOGLE_OAUTH_ID=
GOOGLE_OAUTH_SECRET=
GOOGLE_OAUTH_CALLBACK_URL=
JWT_SECRET=
CLIENT_OAUTH_REDIRECT_URI=
```

`server` 디렉토리에 위와 같이 `.env.dev` 파일을 생성합니다

```
$ npm i
```

server에 필요한 npm 패키지들을 설치합니다.

```
$ docker-compose up
```

development 데이터베이스를 실행합니다

```
$ cd ../
$ ./bulid.sh
```

client의 React App을 빌드합니다

```
$ npm run start:dev --prefix server
$ npm run start -- prefix client
```

마지막으로, API node js 서버와 Create React App development 서버를 실행합니다

Happy Hacking!