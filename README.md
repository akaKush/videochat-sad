# videochat-sad

- [videochat-sad](#videochat-sad)
  - [Passos seguits per executar el codi en localhost:](#passos-seguits-per-executar-el-codi-en-localhost)
  - [Descripció del codi](#descripció-del-codi)

## Passos seguits per executar el codi en localhost:

Entrem al repositori i executem els següents comandos:

- `npm init -y` --> ens crea el `package.json` i `package-lock.json`, on tindrem totes les dependencies del nostre projecte.
- `npm i express ejs socket.io` --> instal·lem tots els paquets necessaris per poder treballar amb conexions peer to peer:
  - express: Proporciona la infraestructura del servidor de node.js, i tots els mòduls de node necessaris (`node modules`).
  - ejs: proporciona *templates* per JavaScript.
  - socket.io: Llibreria que permet l'intercanvi bidireccional en temps real de comunicació entre el servidor i el navegador.
  <img src="/socketio.png" alt="socket.io">
- `npm i uuid` --> el paquet uuid ens crea IDs dinàmics per poder accedir a diferents sales de videoconferència cada cop que en creem una de nova.
- `npm i --save-dev nodemon` ens crea la dependència de nodemon, amb el qual podrem executar el nostre projecte en temps real cada cop que fem un canvi.
- Llavors obrim el fitxer `package.json` i a l'apartat dels scripts, canviem l'script de "test" per un anomenat "start" (per fer-lo igual que el de create-react-app) tal que: `"start": "nodemon server.js"`, així el servidor sap que ha d'executar el fitxer de server.js.
  - A partir d'ara, sempre que vulguem executar la nostre aplicació en localhost, des del terminal executem: `npm run start` o `yarn start` i obrim una pestanya al navegador a **localhost:300** per veure en temps real l'execució. Al terminal també veurem com s'està executant el servidor.


## Descripció del codi
