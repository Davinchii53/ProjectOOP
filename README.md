# cooksnap Prototype

Ini masih UI yang awalan. Kalo yang ngeluarin hasil cek aja di Figma.  
Kalo mau liat hasilnya harus lewat Expo Go karena gua pake itu works, tapi mau pake apapun bebas.  
Ini udh bagus, smooth ga usah di ganti-ganti lagi, tinggal lanjutin aja bagian kedua UI nya.

**Side note**: Picker yang dari React Native itu terpisah dari import yang lain, jadi jangan kaget, karena harus download dari `@react-native-picker/picker` langsung jadi harus download dulu.

Pokoknya ini setengah udh jadi, lanjutin aja, jangan ganti-ganti lagi yang bagian gua.

# dokumentasi docker buat front end dev

dockerfile dan composenya udah ada tinggal build jadi kalian gausah lagi install depedencies yang dibutuhin buat expo -  react

**DOCKERFILE JANGAN DIPEGANG**

## docker build script
udah gw buatin script automatis buat ngebuild kalian main di folder Front-end aja. 
scriptnya bakal langsung jalanin expo langsung jadi tinggal ngoding aja dia bakal hot reload sesuai fitur expo

jalaninnya:

(linux)


bikin jadi executable dulu
```bash
chmod u+x
```

baru nyalain scriptnya (butuh sudo)
```bash 
sudo ./up.cmd
```

windows

langsung klik 2 kali script up.cmd aja

## IMPORTANT
**JANGAN PERNAH INSTALL DEPENDENCY LANGSUNG DI PC KALIAN**


kalo mau nambahin depedency buat aplikasinya **TOLONG INSTALL LANGSUNG DI DOCKER IMAGENYA** dengan buka **TERMINAL KEDUA LALU JALANKAN**



jalanin ini
```bash
docker exec -it cooksnap-frontend sh
```
baru install dependency yang dibutuhkan

contoh install dependencies dalam Docker:
```bash
npm install <package>
```
or
```bash
npx expo install <expo-package>
```

jangan pernah **MATIIN** container saat install dependencies.

