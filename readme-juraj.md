1. I decided to use main component APP with 3 main layers Header,SideBar and MainContent
2. Header for top navigation project info
3. SideBar for Project and Notes controls
4. Project is used for open modal where you can open or create project with uniqe id
5. Notes is used for adding notes to project where each note has projectId in database
6. MainContent is layer where array of ClipTimeline's layers are and Add button with modal open functionallity, to open/add ClipTimeline
7. every ClipTimeline is separate reusable component with RemoteBar, TimelineRange, array of Track's and Indicator
8. I provide global state int ProjectProvider to use anywhere in the App
9. I also use Provider for Apollo client, to use graphql to create and query notes for project
10. For project is possible to add or create clips from db, after adding is Save needed to store id of clip to project
11. For every clip there is indicator which you can start by button to play clip or move manually by press, hold and move functionality
12. There is option to move track left and right but that otpion is not fully worked yet.
13. After choosing possition it is possible to split clip
14. There is choice to enable repeat button and change scale of timeline
15. For comunication with sb i made hook useHandleDb containing methods open, create, update, readAll

If I have had more time 
1. I would probaly finish tracks moving functionality and option to change their vertical possition
2. I would finish undo redo functionality

I did not use any AI, this is not very complicated application. Actually do not use AI for creating code very often, it must be complicated calculation or so on.

