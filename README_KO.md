# 프로젝트에 대하여

Mabicord AIO는 MMORPG 마비노기의 레이드 메시지와 뿔피리 메시지를 처리하는 Discord 봇으로, 단일 Discord 서버에 서비스를 제공하도록 설계되었습니다.

# 기능

- 지정된 Discord 채널에 필드 레이드 이벤트 알림을 중계합니다.
- 지정된 Discord 채널에 뿔피리 메시지를 중계합니다.
- 사용자가 자신의 키워드를 설정할 수 있습니다. 새 뿔피리 메시지에 키워드가 포함된 경우 사용자를 멘션하여 알림을 보냅니다.
- 서버 상태 변경 사항을 모든 채널에 알립니다.

# 설치하기

## 요구 사항

- Windows 10 (낮은 Windows 버전은 테스트되지 않음)
- [npcap](https://npcap.com/)
- [node.js](https://nodejs.org/) 16.13.1 이상

## 준비하기

### 디스코드 봇 준비하기

1. [Discord 개발자 포털](https://discord.com/developers/applications)에 접속합니다.
2. 새 응용 프로그램을 만듭니다.
3. *Bot*에서 *Add Bot*을 클릭합니다.
    1. 봇을 추가할 수 있는 권한이 있는 서버에 봇을 유지하려는 경우 공개 봇의 선택을 취소합니다.
4. *Reset Token*을 클릭합니다. 이 문자열을 기록해 두십시오.
5. *OAuth2 → URL Generator*에서:
    1. *bot*과 *applications.commands* 범위를 체크합니다.
    2. *bot permissions*에서 *administrator*를 선택하거나 권한을 최소로 유지하려면 다음을 체크하세요.
        1. Read Messages/View Channels
        2. Send Messages
        3. Embed Links
        4. Read Message History
        5. Mention Everyone
        6. Add Reactions
        7. Use Slash Commands
    3. *생성된 URL*을 기록해 두십시오. 이것은 봇을 서버에 추가하는 데 사용하는 링크입니다.

### Discord 개발자 모드 활성화

1. 데스크톱 또는 웹 버전의 Discord에서 *사용자 설정 → 고급*으로 이동하여 *개발자 모드*를 활성화합니다.
2. 개발자 모드가 활성화된 상태에서 요소를 마우스 오른쪽 버튼으로 클릭하여 컨텍스트 메뉴를 통해 요소의 ID에 액세스할 수 있습니다.

### 프로젝트 준비
1. 리포지토리를 ZIP으로 다운로드합니다.
2. 편리한 폴더에 파일의 압축을 풉니다.
3. 프로젝트의 루트 디렉터리에서 `config-example.json`을 `config.json`으로 복사합니다.

## 설정하기

`config-example.json`을 `config.json`에 복사합니다.
다음 옵션을 편집합니다.

| 이름 | 설명 |
| --- | --- |
| prefix | Mabicord AIO 명령어의 접두어입니다. |
| token | Discord 개발자 포털에서 발행된 봇 토큰입니다. |
| owner | 봇 소유자의 ID입니다. |
| client_id | Discord 개발자 포털에서 발급된 Application ID입니다. |
| test_guild_id | 봇 테스트 서버의 서버 ID입니다. 봇을 위한 전용 테스트 서버를 두는 것이 좋습니다. |
| guild_id | 봇이 실사용 될 서버의 서버 ID입니다. Mabicord AIO는 단일 서버를 서버하도록 설계되었습니다. |
| channel_log | 뿔피리 메시지를 중계하기 위한 채널의 ID입니다. |
| channel_alert | 뿔피리 메시지에서 키워드가 일치할 때 사용자를 언급하기 위한 채널의 ID입니다. |
| channel_raid | 레이드 이벤트를 중계할 채널의 ID입니다. |
| channel_command | 명령어를 듣기 위한 채널의 ID입니다. 이 값을 "ANY"로 설정하면 봇이 어디서나 명령을 수락할 수 있습니다. |
| bugle_collect | 레이드 알림 기능을 사용할지 여부를 설정합니다. ON 또는 OFF 중에서 선택합니다. 기본값은 ON입니다. |
| raid_collect | 레이드 알림 기능을 사용할지 여부를 설정합니다. ON 또는 OFF 중에서 선택합니다. 다중 서버 Discord 서버에서 충돌을 피하기 위해 기본값은 OFF입니다. |
| role_raid | 레이드가 발생했을 때 언급할 멤버 롤의 ID입니다. |
| device_address | 네트워크 패킷을 캡처하는 데 사용되는 장치의 주소입니다. deviceList.js를 사용하여 장치 주소를 찾으십시오. |
| cap_filter | 들어오는 패킷의 부분 IP 주소입니다. IP는 공식 한국 서버의 류트 서버로 기본 설정됩니다. |
| patch_url | 패치 정보 텍스트 파일의 주소입니다. 공식 한국 서버가 기본값입니다. |
| language | Mabicord AIO가 메시지를 보낼 언어입니다. english와 korean을 지원합니다. 언어는 한국어로 기본 설정됩니다. |
| config.css | Mabicord가 전송할 스타일의 메시지입니다. CSS와 plain 간에 선택하십시오. |
| config.bugle_style | 뿔피리 메시지 중계 스타일입니다. css, plain, webhook 중에서 선택하십시오. 웹훅을 사용하면 뿔피리 사용자가 메시지를 보낸 것처럼 메시지를 보냅니다. |
| config.webhookID | 웹훅 URL의 ID 부분입니다. 웹훅 URL은 https://discord.com/api/webhooks/ID/Token으로 구성됩니다. |
| config.webhookToken | 웹훅 URL의 토큰 부분입니다. 웹훅 URL은 https://discord.com/api/webhooks/ID/Token으로 구성됩니다. |

## 마비코드 AIO 구동하기

1. 마비노기에서 아무 캐릭터로 로그인하세요.
2. `npm run start`를 실행합니다.
    - 선택적으로 `forever` 또는 `pm2`를 사용하여 `bot.js`를 시작합니다.

# 명령어 사용하기
| 명령 | 설명 |
| --- | --- |
| !도움말 | DM을 통해 모든 명령/도움말 메시지 보내기 |
| !추가 키워드 | 키워드를 추가합니다. 공백으로 구분하여 여러 키워드를 추가하십시오. |
| !삭제 키워드 | 키워드를 제거하십시오. 한 번에 하나씩만 제거할 수 있습니다. |
| !목록 | 현재 등록된 키워드를 나열합니다. |
| !초기화 | 모든 키워드를 제거하십시오. |

# 문제 해결하기

## `device_address` 찾기

공유기에서 할당한 IP 주소를 사용하십시오. 라우터 설정에서 구성하여 고정 DHCP를 사용하는 것이 좋습니다.
공유기에서 발급한 IP 주소를 모르는 경우 세 가지 옵션이 있습니다.
1. 라우터 설정에 액세스하여 어떤 IP를 발행하고 있는지 확인합니다.
2. Windows 네트워크 설정에서 IPv4 주소를 찾습니다. 네트워크 장치의 '하드웨어 속성'에 있습니다.
3. `node deviceList.js`를 실행하여 공유기에서 할당한 `addr`을 확인하고 사용합니다.

## 내 게임서버의 `cap_filter` 값은 무엇입니까?

`device_address`를 올바르게 설정되었다는 가정 하에, 마비노기가 실행중인 상태에서 `node findChannel.js`를 실행한다면, 메시지에 `<ALL_CHANNELS>`가 포함되어 있을 경우 유효한 채널 IP 주소와 데이터를 터미널로 출력합니다.
채널 IP를 성공적으로 기록했다면 채널 이동으로 모든 IP 주소를 기록하십시오. 이 과정을 더 빠르게 하기 위해 뿔피리 메시지를 직접 보낼 수 있습니다.
모든 IP 주소를 수집했으면 공통 값을 찾아 '211.218.233'을 적절하게 바꿔줍니다. 값을 부분적으로 생략하면 자동으로 부분적으로만 매칭합니다.

# 기여

Issue나 PR을 통해 자유롭게 기여하세요!
저에게 연락해야 하는 경우 Discord의 Lx#2909로 연락하세요.
