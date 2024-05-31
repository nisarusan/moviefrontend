### Stappenplan


Hieronder zijn in enkele stappen uitgelegd hoe dit project correct te installeren:
Frontend

1. Git clone https://github.com/nisarusan/moviefrontend
2. Ga naar terminal en typ in: npm install
Hiermee installeer je de algemene requirements en worden de benodigden node
modules geinstalleerd
3. Na installatie van algemene requirements, moeten ook de aanvullende
requirements geinstalleerd worden. Typ in terminal:
1. npm install axios
2. npm install jwt-token
3. npm install swiper
Extra additional voor MacOS gebruikers die op een oudere model zitten, moet
dit ook nog bij geinstalleerd worden:
npm install @rollup/rollup-darwin-x64
4. Na installeren van benodigdheden kan je het project runnen met de volgende
commando in terminal:
npm run dev


Let-op: wel is het van belang dat je in de tussen



### React (Dev depedencies)
1. ViteJS: ViteJS plugin-react essentieel;
2. Eslint: Eslint is niet noodzakelijk, maar helpt bij ondersteuning;
3. React-Router-dom: Essentieel om het project te kunnen laten draaien
4. Vite-plugin-svgr (11.1.1): Vite is essentieel en ook de Vite plugin svgr is
noodzakelijk. Anders kan er geen svgr plaatjes geladen worden


### Library's algemeen
Een lijst van libraries / dependencies nodig om de applicatie werkend te krijgen en
optimaal te laten werken.
React (Algemeen depedencies)
1. Axios: MovieFlix maakt gebruik van PostgreSQL als relationele database voor
het opslaan van gegevens. Zorg ervoor dat je een draaiende PostgreSQL-server
hebt en dat je de database hebt geconfigureerd voor gebruik met de applicatie.
Je kunt PostgreSQL downloaden vanaf de officiële website.
2. Jwt: Als je de broncode van MovieFlix wilt downloaden en lokaal wilt uitvoeren,
heb je Git nodig om de repository te klonen. Git kan worden gedownload vanaf
de officiële website.
3. React-dom: Een terminal of command line interface is vereist om opdrachten uit
te voeren, zoals het starten van de Spring Boot-applicatie en het uitvoeren van
database-migraties.
4. React-Router-dom: Spring Boot is een framework voor het bouwen van Java-
applicaties. Zorg ervoor dat je de nodige afhankelijkheden en configuraties hebt
geconfigureerd om Spring Boot-applicaties te kunnen draaien. Je kunt Spring
Boot downloaden vanaf de officiële website of het Maven Central Repository.
5. Swiper (11.1.1):
MovieFlix wordt nu gebouwd met behulp van Java met Spring Boot. Zorg ervoor
dat je JDK is geïnstalleerd op je systeem. Je kunt de JDK downloaden vanaf de
officiële Oracle-website of bij het instellen in IntelliJ Idea.
