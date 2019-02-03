/_ To use react native using local server use ngrok as https is encouraged to use on react native and ngrok provide a https server for the localhost _/

/**\*\*\*\*** STEPS to use ngrok **\*\***/

1. download ngrok from 'https://dashboard.ngrok.com/get-started'
2. Extract it and open terminal
3. visit location of extracted file for ngrok using cd /path to ngrok
4. use command : ./ngrok http 7000 ( use your port for server side)
5. From the interface opens copy 'Forwarding link (ex: https://f2b55bfc.ngrok.io )'
6. Paste this link to fetch api (Axios.post("https://f2b55bfc.ngrok.io/api/userAuth/login", userData))

// To Use IP of different network

Step: 1 open new terminal always to change IP
Step: 2 Find IP address using command 'hostname -I or ifconfig or ipconfig'
Step: 3 Paste command export REACT_NATIVE_PACKAGER_HOSTNAME='your ip address-192.168.2.108'
Step: 4 npm start
