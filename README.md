# Authentication of IoT Devices using Blockchain Technology

_This project is intended to simulate IoT device authentication using the bubble of trust approach. The entire project is build using javascript technologies. Therefore, understanding of javascript or at least how to run NODE.js projects is required to get this project up and running on your local computer._

### How to run this project

_To run this project. You will require the following softwares:_
_1. Node JS_
_2. Ganache_
_3. Git_
_4. VS Code or any code editor of your choice_

##### STEPS 1 ( Clone or Pull the project )

If you are already running the project. I will suggest just pulling the project to get the latest update. However, if this is your first time running the project then you should clone the project. use the commands below per your needs

###### **New Users**

1. Navigate to your desktop or any location in your computer where you want to store your project.
2. Open a terminal at this location
3. Clone the project with `git clone https://github.com/elsalvacion/blockchain-final-project.git`
4. Finally navigate to the newly cloned project. It should be named `blockchain-final-project`
5. Run `code .` to open VS code at the current location of the project.

###### **Already running the project**

1. If you are already running the project and want to fetch recent updates made to the project and merge them to your local project. Then you will have to pull the project.
2. Pull the project from the remote github repo with the commands below.
3. Open a terminal and navigate to the project location in your computer.
4. Run `git pull`
5. The command above will fetch the recent update from the github repo.

##### STEPS 2 ( Install project dependencies )

The project you just cloned has two sub-folders `frontend` and `backend`. Each of this folders have some npm packages that need to be installed to be able to run the project successfully.

1. Navigate to the `frontend` folder with cd
2. Run `npm i` and wait for the installation to complete
3. Move out of the `frontend` folder and navigate to the `backend` folder with cd ../backend
4. Run `npm i` and wait for the installation to complete

##### STEPS 3 ( Run Ganache and deploy smart contract )

To deploy the smart contract we will need to lunch our Ganache ethereum blockchain and select one account as your default blockchain account.

1. Select your account and change the private key in the `.env` file in the `backend` to match the private key of your account.
2. The navigate back to the `backend` folder and run `node deploy.js`
3. The command above will deploy our smart contract to the blockchain. So that our backend can interact with it when the time comes.
4. Finally on your Ganache move to the `transactions` tab to copy the address of the newly `CREATED CONTRACT ADDRESS` and change the one on the `.env` file at the `backend` folder.

##### STEPS 4 ( Run both frontend and backend code )

Finally we can now run our frontend and backend code and start using the system. For this step to successfully done. You need to open two terminals on your computer or your VS Code integrated terminal with `ctrl ~`

1. Navigate to the `backend` folder using the appropiate cd command
2. Run `npm run dev`
3. Navigate to the `frontend` folder using the appropiate cd command
4. Run `npm start`

The commands above will run NODE.js server that will interact with blochain directly and the frontend REACT.JS code at port 3000 that will send requests and listen for real time changes made on the server.
