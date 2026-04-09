# 🚦 Traffix - Smart Traffic Control System

Traffix is an AI-based intelligent traffic management system that dynamically controls traffic signals based on real-time vehicle density.

## 📌 Overview
Traditional traffic lights use fixed timers, which leads to congestion and inefficiency.  
Traffix solves this by using **computer vision and IoT** to adjust signal timings automatically.

## ⚙️ How It Works
1. Video input is processed using **YOLOv8** to detect vehicles.
2. The system counts vehicles in each direction.
3. A **Flask backend** analyzes traffic density.
4. Signal timings are adjusted dynamically.
5. Data is sent to:
   - **ESP32** → controls traffic lights (LEDs)
   - **Firebase** → stores and syncs data
6. A **React dashboard** shows real-time traffic status.

## 🧠 Tech Stack
- **AI/ML:** YOLOv8 (Object Detection)
- **Backend:** Flask (Python)
- **Frontend:** React.js
- **Hardware:** ESP32
- **Database:** Firebase (Realtime DB + Firestore)

## 🔑 Features
- Real-time vehicle detection
- Adaptive traffic signal control
- Low-cost hardware implementation
- Live monitoring dashboard
- Cloud-based data synchronization


## 🧪 Performance & Observations
- The system processes **four video streams (North, South, East, West)** for a single junction.
- Running detection on all directions simultaneously caused **processing delays** due to hardware limitations.
- Despite this, **vehicle detection remained accurate and reliable**.
- System performance can be improved with better hardware or optimized parallel processing.

## ⚠️ Limitations
- Slower processing when handling four-direction video streams simultaneously
- Uses pre-recorded video instead of live camera feed
- No emergency vehicle prioritization yet
- Currently designed for a **single junction only**

## 🔄 Reliability (Fallback Mechanism)
- The system includes a **fallback mechanism on ESP32**
- In case of:
  - Internet failure  
  - Backend communication issues  
- The ESP32 switches to a **default signal cycle**, ensuring continuous traffic operation

## 🚀 Future Improvements
- Optimize multi-stream processing for real-time performance
- Integrate live CCTV/IP camera feeds
- Add **vehicle waiting time-based prioritization**
- Implement emergency vehicle detection
- Expand to multi-junction coordinated traffic system

## 👩‍💻 Authors
- Prakriti Adhikari and Team

## 📄 License
This project is for academic and research purposes.