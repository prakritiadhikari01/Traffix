#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

// WiFi credentials
const char* ssid = "traffix";
const char* password = "traffix123";  // Open network

// Backend URL (GET)
const char* backendUrl = "http://192.168.56.185:5000/traffic-status";

// LED pin definitions
// EAST
#define EAST_RED_PIN     2
#define EAST_YELLOW_PIN  4
#define EAST_GREEN_PIN   15

// NORTH
#define NORTH_RED_PIN    19
#define NORTH_YELLOW_PIN 18
#define NORTH_GREEN_PIN  5

// WEST
#define WEST_RED_PIN     21
#define WEST_YELLOW_PIN  22
#define WEST_GREEN_PIN   23

// SOUTH
#define SOUTH_RED_PIN    25
#define SOUTH_YELLOW_PIN 26
#define SOUTH_GREEN_PIN  14

// 🔧 LED setup
void setupLeds() {
  int pins[] = {
    NORTH_RED_PIN, NORTH_YELLOW_PIN, NORTH_GREEN_PIN,
    SOUTH_RED_PIN, SOUTH_YELLOW_PIN, SOUTH_GREEN_PIN,
    EAST_RED_PIN, EAST_YELLOW_PIN, EAST_GREEN_PIN,
    WEST_RED_PIN, WEST_YELLOW_PIN, WEST_GREEN_PIN
  };
  for (int i = 0; i < 12; i++) {
    pinMode(pins[i], OUTPUT);
    digitalWrite(pins[i], LOW);
  }
}

// 🔴 Turn all to RED (default state)
void setAllRed() {
  digitalWrite(NORTH_RED_PIN, HIGH);
  digitalWrite(SOUTH_RED_PIN, HIGH);
  digitalWrite(EAST_RED_PIN, HIGH);
  digitalWrite(WEST_RED_PIN, HIGH);

  digitalWrite(NORTH_YELLOW_PIN, LOW);
  digitalWrite(SOUTH_YELLOW_PIN, LOW);
  digitalWrite(EAST_YELLOW_PIN, LOW);
  digitalWrite(WEST_YELLOW_PIN, LOW);

  digitalWrite(NORTH_GREEN_PIN, LOW);
  digitalWrite(SOUTH_GREEN_PIN, LOW);
  digitalWrite(EAST_GREEN_PIN, LOW);
  digitalWrite(WEST_GREEN_PIN, LOW);
}

// 🟡 Run fixed pattern in offline/static mode
void runCycle(int redPin, int yellowPin, int greenPin, const char* dirName) {
  const int greenTime = 7000;
  const int yellowTime = 2000;

  Serial.print("Static GREEN for ");
  Serial.println(dirName);

  setAllRed();
  delay(50);
  digitalWrite(redPin, LOW);
  digitalWrite(greenPin, HIGH);
  delay(greenTime);

  digitalWrite(greenPin, LOW);
  digitalWrite(yellowPin, HIGH);
  delay(yellowTime);
  digitalWrite(yellowPin, LOW);
}

// Run static mode (offline fallback)
void runStaticTrafficPattern() {
  Serial.println("⚠️ Running STATIC pattern (offline fallback)");

  runCycle(NORTH_RED_PIN, NORTH_YELLOW_PIN, NORTH_GREEN_PIN, "North");
  runCycle(EAST_RED_PIN, EAST_YELLOW_PIN, EAST_GREEN_PIN, "East");
  runCycle(SOUTH_RED_PIN, SOUTH_YELLOW_PIN, SOUTH_GREEN_PIN, "South");
  runCycle(WEST_RED_PIN, WEST_YELLOW_PIN, WEST_GREEN_PIN, "West");
}

// Setup WiFi and LEDs
void setup() {
  Serial.begin(115200);
  setupLeds();

  WiFi.disconnect(true);
  delay(1000);
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  Serial.print(" Connecting to WiFi");
  int attempt = 0;
  while (WiFi.status() != WL_CONNECTED && attempt < 20) {
    delay(500);
    Serial.print(".");
    attempt++;
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\n Connected to WiFi!");
    Serial.print(" IP Address: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("\n Failed to connect to WiFi. Running static mode.");
  }
}

// Main loop with proper traffic signal handling
void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(backendUrl);
    int httpCode = http.GET();

    if (httpCode > 0) {
      String payload = http.getString();
      Serial.println(" Received: " + payload);

      StaticJsonDocument<2048> doc;
      DeserializationError error = deserializeJson(doc, payload);
      if (!error) {
        setAllRed(); // Reset all lights

        for (JsonObject dirData : doc.as<JsonArray>()) {
          const char* dir = dirData["direction"];
          bool green = dirData["green"];
          bool yellow = dirData["yellow"];
          bool red = dirData["red"];

          if (strcmp(dir, "north") == 0) {
            digitalWrite(NORTH_RED_PIN, red);
            digitalWrite(NORTH_YELLOW_PIN, yellow);
            digitalWrite(NORTH_GREEN_PIN, green);
          } else if (strcmp(dir, "south") == 0) {
            digitalWrite(SOUTH_RED_PIN, red);
            digitalWrite(SOUTH_YELLOW_PIN, yellow);
            digitalWrite(SOUTH_GREEN_PIN, green);
          } else if (strcmp(dir, "east") == 0) {
            digitalWrite(EAST_RED_PIN, red);
            digitalWrite(EAST_YELLOW_PIN, yellow);
            digitalWrite(EAST_GREEN_PIN, green);
          } else if (strcmp(dir, "west") == 0) {
            digitalWrite(WEST_RED_PIN, red);
            digitalWrite(WEST_YELLOW_PIN, yellow);
            digitalWrite(WEST_GREEN_PIN, green);
          }
        }

        delay(1000); // Update rate (every 1 second)

      } else {
        Serial.println("JSON parse error. Running static mode.");
        runStaticTrafficPattern();
      }

    } else {
      Serial.print("HTTP request failed, code: ");
      Serial.println(httpCode);
      runStaticTrafficPattern();
    }

    http.end();

  } else {
    Serial.println("WiFi not connected. Running static mode...");
    runStaticTrafficPattern();
    WiFi.reconnect(); // Try reconnecting
  }
}