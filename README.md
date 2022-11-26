# API-Factory

`API FACTORY`는 AWS에 대한 지식이 없이도 AWS resource를 사용하여 FaaS (Function as a Service) 방식의 Backend를 구축할 수 있도록 도와주는 개발자를 위한 Wep application입니다.

<br/>

## Github Repository

- [Frontend](https://github.com/jun2212/API-Factory-Frontend)
- [Backend](https://github.com/jun2212/API-Factory-Backend)
- [Serverless Backend](https://github.com/jun2212/API-Factory-Severless-API)

<br/>

## 프로젝트 기간

- 아이디어 수집 및 칸반 제작 : 2022.11.07 ~ 2022.11.14
- 제작 및 배포 : 2022.11.14 ~ 2022.11.25

<br/>

## Contents

- [개발 동기](https://github.com/jun2212/API-Factory-Backend#개발-동기)
- [기술 스택](https://github.com/jun2212/API-Factory-Backend#기술-스택)
- [Feature](https://github.com/jun2212/API-Factory-Backend#Feature)
- [Challenges](https://github.com/jun2212/API-Factory-Backend#Challenges)
- [고민했던 점](https://github.com/jun2212/API-Factory-Backend#고민했던-점)
- [개선하고 싶은 점](https://github.com/jun2212/API-Factory-Backend#개선하고-싶은-점)
- [📂 파일 구조](https://github.com/jun2212/API-Factory-Backend#-파일-구조)

<br/>

## 개발 동기

<br/>

- AWS는 사용한 만큼의 비용만을 지불한다는 점과 Scaling에 신경쓰지 않아도 된다는 점 등의 많은 매리트로 클라우드 점유율이 전세계 33%, 국내에선 50%에 육박하고 있다.
- 많은 회사들이 사용하는 만큼 나도 늘 사용해 보고 싶었지만, 다른 서비스들에 비해 상대적으로 높은 진입 장벽에 망설여 졌었다.
- 그래서 나는 직접 AWS의 사용방법을 익히면서 현재 나처럼 AWS에 대한 지식이 없는 사람들도 손쉽게 AWS resource를 사용할 수 있도록 도와주는 서비스를 개발하기로 하였다.

<br/>

## 기술 스택

<br/>

![](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black)
![](https://img.shields.io/badge/Node.js-311C87?style=flat-square&logo=Node.js&logoColor=339933)
![](https://img.shields.io/badge/express-DA3940?style=flat-square&logo=express&logoColor=black)
![](https://img.shields.io/badge/Passport-DC461D?style=flat-square&logo=Passport&logoColor=34E27A)
<br/>
![](https://img.shields.io/badge/AmazonS3-569A31?style=flat-square&logo=AmazonS3&logoColor=black)
![](https://img.shields.io/badge/Serverless-black?style=flat-square&logo=Serverless&logoColor=FD5750)
![](https://img.shields.io/badge/DynamoDB-232F3E?style=flat-square&logo=AmazonDynamoDB&logoColor=4053D6)
<br/>
![](https://img.shields.io/badge/sandbox-VM2-4946DD?style=flat-square)
<br/>

### 배포

- Frontend -> ![](https://img.shields.io/badge/Netlify-00C7B7?style=flat-square&logo=Netlify&logoColor=white)
- Backend -> ![](https://img.shields.io/badge/ElasticBeanstalk-8BC0D0?style=flat-square&logo=AmazonECS&logoColor=FF9900)
- Serverless Backend -> ![](https://img.shields.io/badge/Lambda-A22846?style=flat-square&logo=AWSLambda&logoColor=FF9900)

<br/>
<br/>

## Feature

- 사용자가 입력한 함수를 api를 통해 사용할 수 있도록 해준다.
- 사용자는 자신이 생성한 함수를 수정/삭제 할 수 있다.
- 사용자는 함수 내에서 dynamoDB와 S3를 사용 할 수 있다.
- 사용자는 함수 내에서 서비스에서 제공하는 lodash, axios 등의 라이브러리를 사용 할 수 있다.
- 사용자는 해당 기능들을 이용해 serverless 환경의 Backend를 구현할 수 있다.

<br/>

## Challenges

<br/>

### 악의적인 코드에 대한 대응

- 사용자가 입력해 주는 코드를 대신 실행해 주는 서비스를 구현하는 것이기 때문에 `AWS SDK` 직접 조작 등의 악의적인 함수를 제어할 필요가 있었다. 이 부분에 대해 여러 옵션을 고려했지만 `VM2`에서 제공하는 Sandbox 내에서 함수를 실행 시키고 VM2에서 제공하는 방식에 따라 제한된 라이브러리를 Sandbox 내에 제공하는 것으로 생각보다 쉽게 해결할 수 있었다.

<br/>

### 사용자의 DynamoDB 사용

- `API FACTORY`의 사용자는 또 다른 개발자가 타겟이다. 따라서 나는 DB 내에서 내 서비스의 사용자들을 구분해야 하고, 그 사용자들도 자신의 서비스의 사용자들을 구분 할 수 있어야 했다. `DynamoDB`에서는 `파티션 키(Partition Key)`와 `정렬키(Sort Key)`를 제공하는데, 파티션 키에는 유저의 고유키를 넣고 사용자에게 정렬키를 사용할 수 있는 라이블리를 제공하는 방식을 사용했다.

<br/>

### 사용자의 S3 사용

- 사용자에게 저장소를 사용 할 수 있도록 해줄 방법을 찾다가 `PreSigned url`을 알게 되었다. 이 서비스에서 제공하는 라이브러리에 사용자가 원하는 object key와 하고싶은 작업(get, put)을 입력하면, 해당 object key에 유저의 고유키를 prefix로 붙여서 PreSigned url을 발급받아 돌려주는 방식을 사용했다.

<br/>

### 배포 관련 이슈

Frontend와 Backend를 각각 다른곳에 배포하면서 여러가지 문제가 발생했었다.

<br/>

1. Mixed Content 이슈

   - ElasticBeanstalk는 http로 배포가 되기때문에 https로 배포된 Frontend와의 연결을 browser에서 차단했다. 그래서 `SSL` 인증서를 받아 Backend에 `load balancer`적용을 시켜줌으로서 해결했다.

   <br/>

2. load balancer통한 Frontend와 Backend의 연결

   - 통신 문제는 해결하였으나 이번엔 `cookie`가 전달되지 않는 문제가 발생했다. 이는 Frontend와 Backend가 직접 연결되는 것이 아니라 load balancer를 통하면서 생긴 문제였고 express-session에 `proxy`옵션을 추가함으로서 해결했다.

   <br/>

3. domain
   - Backend에서 Frontend로 cookie를 보내왔지만 해당 cookie가 브라우저에 적용되진 않았다. cookie는 `domain`에 종속적인데 Frontend와 Backend의 `domain name`이 달랐기 때문이었다. express-session의 cookie에 `sameSite:"none"` 옵션을 줘서 문제를 해결했다.

<br/><br/>

## 고민했던 점

<br/>

### DynamoDB에서의 글로벌 보조 인덱스 사용

<br/>

사용자에게 자신이 만든 api목록과 내용을 제공하기 위한 방법에는 세가지 옵션이 있었다.

<br/>

1. 정렬키 (Sort Key)
   - 정렬키로 해당 사용자의 아이디를 넣게 된다면 사용자가 api를 사용할 때마다 function_key 와 자신의 아이디를 입력해야만 했다. 나는 사용자가 function_key만을 사용해서 간편하게 api를 사용할 수 있도록 해주고 싶었기에 배제하게 되었다.
2. 스캔 (Scan)
   - 테이블 전체를 읽어서 찾아오기에 속도나 비용적이 면에서 모두 지양되는 방식이라 배제하게 되었다.
3. 글로벌 보조 인덱스 (Global Secondary Indexes)
   - 사용자가 만든 api들의 모든 정보가 필요했고, 따라서 테이블의 모든 속성을 보조 인덱스로 프로젝션 해야만 했다. 이는 비용적인 면에선 다소 불리한 면이 있지만 셋 중 내가 구현하고자 하는 서비스에 가장 적합하다 판단되어 선택하게 되었다.

<br/>

### 타임아웃, 메모리제한

<br/>

1. 타임아웃

   - 처음 고려했던 옵션은 사용자가 입력한 시간에 따라 VM2의 Vm에서 지원하는 타임아웃을 이용하는 것이었다. 하지만 VM은 지원할 라이브러리를 모두 require한 뒤 sandbox에 미리 넣어주어야 해서 효율이 좋지 않고, 사용자는 익숙한 require 구문을 사용할 수 없으므로 코딩 방식이 일반적인 자바스크립트 코딩과 달라 사용자 경험에 좋지 않다고 판단 되었다. 이에 따라 require를 지원하는 NodeVm을 사용하기로 했지만 NodeVm의 단점이 타임아웃을 지원하지 않는 것이었다. 게다가 NodeVm은 sandbox 내부에서 실행되는게 아니라 일반 코드처럼 실행을 시켜 주기 때문에, 유저의 코드에 무한루프가 존재할 경우 외부에서 이를 차단할 수 없는 단점이 있었다. 따라서 타임아웃은 람다 배포시 설정할 수 있는 람다 자체의 타임아웃을 사용 하기로 하였고, 여러 옵션의 타임아웃을 가진 api들을 배포하고 사용자가 필요에 따라 골라서 사용하는 방식으로 처리하려 했었다.

2. 메모리 제한
   - 사용자가 API에서 메모리나 CPU(Lambda는 설정한 메로리 크기에 따라 더 많은 CPU를 제공한다)를 필요에 따라 사용자가 선택할 수 있도록 해 줄 필요가 있었다. 이를 위한 람다 메모리 설정 또한 배포를 할 때 지정해야 했다. 하지만 메모리 제한과 타임아웃을 둘 다 api를 나누는 방식으로 제공할 경우 api 주소가 기하급수적으로 늘어가게 되는 문제가 있었다. 따라서 람다의 성능이 다양하게 필요할 경우가 응답시간이 다양하게 필요한 경우보다 많을 것이라 판단해 메모리 별로만 api를 나누기로 하였다.

<br/>

## 개선하고 싶은 점

<br/>

### Backend

<br/>

- 이번 프로젝트에서의 Backend(Express)의 역할은 사용자가 입력한 함수 정보를 dynamoDB에 저장/수정/삭제 해주는 것과 로그인 관리다. 사실 이 기능들은 Lambda로도 구현 가능한 부분이지만 이전에 진행한 팀 프로잭트에서도 Express를 사용하지 않았고, 포트폴리오 성격의 프로잭트이기 때문에 Express를 무조건 넣어야 겠다는 생각을 했다. 아키텍처적인 면으로 봤을때는 올바른 구조가 아닌것 같아서 추후에 모두 Lambda로 교체하고싶다.

<br/>

### 로그인 관리

<br/>

- 처음엔 로그인도 일관성 있게 Amazon Cognito를 사용하려다가 Backend의 불륨을 늘리기 위해서 passport를 사용했다. 하지만 어느정도 완성을 하고 보니 잘못된 판단을 한 것 같았다. session 방식 보다는 JWT token 방식의 로그인이 최근 좀 더 선호되기도 하고 Cognito를 사용했어도 큰 불륨의 차이는 없었을 것 같았다. 아니면 passport를 사용하더라도 passport local이 아니라 소셜 로그인 방식을 사용하는게 더 좋지 않았을까 라는 생각이 들었다.

<br/>

### Frontend의 재배포

<br/>

Frontend와 Backend의 domain name이 달라서 생긴 이슈를 sameSite: "none"을 줘서 해결했지만 보안상 좋은 방법은 아닌것 같아 Frontend도 aws에 배포하고 `sub domain`을 사용하는 방식으로 개선해보고 싶다.

<br/>

## 📂 파일 구조

<details>
<summary>Frontend</summary>
📦API-Factory

┣ 📦public  
┃ ┣ 📂assets  
┃ ┃ ┗ 📜favicon.ico  
┃ ┗ 📜index.html  
┣ 📦src  
┃ ┣ 📂app  
┃ ┃ ┗ 📜App.js  
┃ ┣ 📂components  
┃ ┃ ┣ 📂CodeEditor  
┃ ┃ ┃ ┗ 📜CodeEditor.js  
┃ ┃ ┣ 📂ConfirmModal  
┃ ┃ ┃ ┗ 📜ConfirmModal.js  
┃ ┃ ┣ 📂GuideContent  
┃ ┃ ┃ ┗ 📜GuideContent.js  
┃ ┃ ┣ 📂LoginForm  
┃ ┃ ┃ ┗ 📜LoginForm.js  
┃ ┃ ┣ 📂Modal  
┃ ┃ ┃ ┗ 📜Modal.js  
┃ ┃ ┣ 📂NavBar  
┃ ┃ ┃ ┗ 📜NavBar.js  
┃ ┃ ┣ 📂RegisterForm  
┃ ┃ ┃ ┗ 📜RegisterForm.js  
┃ ┃ ┣ 📂TableOfContents  
┃ ┃ ┃ ┗ 📜TableOfContents.js  
┃ ┃ ┗ 📜Portal.js  
┃ ┣ 📂config  
┃ ┃ ┗ 📜constants.js  
┃ ┣ 📂customHooks  
┃ ┃ ┗ 📜customHooks.js  
┃ ┣ 📂features  
┃ ┃ ┗ 📜authState.js  
┃ ┣ 📂pages  
┃ ┃ ┣ 📂APIList  
┃ ┃ ┃ ┗ 📜APIList.js  
┃ ┃ ┣ 📂Error  
┃ ┃ ┃ ┗ 📜Error.js  
┃ ┃ ┣ 📂Guide  
┃ ┃ ┃ ┗ 📜Guide.js  
┃ ┃ ┣ 📂Login  
┃ ┃ ┃ ┗ 📜Login.js  
┃ ┃ ┣ 📂Main  
┃ ┃ ┃ ┗ 📜Main.js  
┃ ┃ ┣ 📂NotFound  
┃ ┃ ┃ ┗ 📜NotFound.js  
┃ ┃ ┣ 📂Register  
┃ ┃ ┃ ┗ 📜Register.js  
┃ ┃ ┗ 📂UpdateFunction  
┃ ┃ ┃ ┗ 📜UpdateFunction.js  
┃ ┣ 📂utils  
┃ ┃ ┗ 📜utils.js  
┃ ┣ 📜index.js  
┃ ┗ 📜setupTests.js
┣ 📜.eslintrc.js
┗ 📜.prettierrc.js

</details>

<details>
<summary>Backend</summary>
📦API-Factory-Backend

┣ 📦routes  
┃ ┣ 📂controller  
┃ ┃ ┣ 📜functionData.controller.js  
┃ ┃ ┗ 📜index.controller.js  
┃ ┣ 📂middleware  
┃ ┃ ┗ 📜localStrategy.js  
┃ ┣ 📂services  
┃ ┃ ┗ 📜index.services.js  
┃ ┣ 📜functionData.js  
┃ ┗ 📜index.js  
┣ 📦utils  
┃ ┣ 📜catchAsync.js  
┃ ┣ 📜dynamoDbUtil.js  
┃ ┗ 📜uuidUtil.js  
┣ 📜.eslintrc.js  
┣ 📜.prettierrc.js  
┗ 📜app.js

</details>

<details>
<summary>Serverless API</summary>
📦API-Factory-serverless-api

┣ 📦src  
 ┃ ┣ 📂lib  
 ┃ ┃ ┣ 📜dynamoDbUtil.js  
 ┃ ┃ ┗ 📜setGeneratePresignedUrl.js  
 ┃ ┗ 📜apiRunner.js  
 ┣ 📜.eslintrc.js  
 ┗ 📜.prettierrc.js

</details>
