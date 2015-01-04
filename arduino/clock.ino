// Modified http://arduino.cc/en/Tutorial/ShftOut12

const short CLOCK_PIN = 12;
const short DATA_PIN = 11;
const short LATCH_PIN = 8;
const short MAX_BITS = 8;

void setup() {
  pinMode(CLOCK_PIN, OUTPUT);
  pinMode(DATA_PIN, OUTPUT);  
  pinMode(LATCH_PIN, OUTPUT);

  // reset state
  for (int bit; bit < MAX_BITS; bit++) {
    write(bit, LOW);
  }

  Serial.begin(9600);
  Serial.println("reset");
}

void loop() {
  if (Serial.available()) {
    // ASCII => 0-based bit
    int bit = Serial.read() - 48;
    write(bit, HIGH);
  }
}

void write(int pin, int state) {
  // output to write to register
  byte output = 0;

  // reset LATCH_PIN
  digitalWrite(LATCH_PIN, LOW);

  // http://arduino.cc/en/Reference/bitWrite
  // Write output to pin
  bitWrite(output, pin, state);

  // http://arduino.cc/en/Reference/shiftOut
  // Shifts out a byte of data one bit at a time.
  // Starts from either the most (i.e. the leftmost) or 
  // least (rightmost) significant bit. 
  // Each bit is written in turn to a data pin, 
  // after which a clock pin is pulsed 
  // (taken high, then low) to indicate that the bit is available.
  shiftOut(DATA_PIN, CLOCK_PIN, MSBFIRST, output);

  // set LATCH_PIN
  digitalWrite(LATCH_PIN, HIGH);
}
