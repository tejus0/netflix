#define DELAY1 500
unsigned long lastExecutedMillis = 0;
float REV = 0;
int pin_a = 2;
int RPM_VALUE;
int PREVIOUS = 0;
int TIME;
int controlAmount = 10;
int rotation = 255;
int speedlimit = 800;      //speed limit required
int Slits =20;              // no of slits in encoder ring
void INTERRUPT()
{
  REV++;
}

void setup()
{
  Serial.begin(9600);
  pinMode(6,OUTPUT);
  pinMode(pin_a, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(pin_a), INTERRUPT, RISING);   // using a pin as intrupt by defining
  // interrupt wave is square wave  so detecting rising edge 
}

void loop()
{
//  Serial.println(millis());
  unsigned long currentMillis = millis();
  if (currentMillis - lastExecutedMillis >= DELAY1) {
    lastExecutedMillis = currentMillis;
//  Serial.println(millis()); for debugging
  detachInterrupt(digitalPinToInterrupt(2));         //             
  TIME = millis() - PREVIOUS;          
  RPM_VALUE = (REV/TIME) * 60000/(Slits);        //
  PREVIOUS = millis();                  
  REV = 0;
  Serial.println(RPM_VALUE);
  attachInterrupt(digitalPinToInterrupt(pin_a), INTERRUPT, RISING);
  }
}

/**********   Magnetic *********/

#define DELAY1 200
unsigned long lastExecutedMillis = 0;
const byte pin_a = 2;   //for encoder pulse A
const byte pin_b = 3;   //for encoder pulse B
const byte pin_fwd = 4; //for H-bridge: run motor forward
const byte pin_bwd = 5; //for H-bridge: run motor backward
const byte pin_pwm = 6; //for H-bridge: motor speed
int encoder = 0;
int m_direction = 0;
//int sv_speed;
//int inputspeed = 40;
//int sv_speed = map(inputspeed, 0, 150, 0, 255);
int sv_speed = 100;     //this value is 0~255
double pv_speed = 0;
int timer1_counter; //for timer

void setup() {
  pinMode(pin_a, INPUT_PULLUP);
  pinMode(pin_b, INPUT_PULLUP);
  pinMode(pin_fwd, OUTPUT);
  pinMode(pin_bwd, OUTPUT);
  pinMode(pin_pwm, OUTPUT);
  attachInterrupt(digitalPinToInterrupt(pin_a), detect_a, RISING);  //
  // start serial port at 9600 bps:
  Serial.begin(9600);
  //--------------------------timer setup
  noInterrupts();           // disable all interrupts
  TCCR1A = 0;
  TCCR1B = 0;
  timer1_counter = 34286;   // preload timer 65536-16MHz/256/2Hz

  TCNT1 = timer1_counter;   // preload timer[ counts whenever one cycle of clock completees]
  TCCR1B |= (1 << CS12);    // 256 prescaler
  TIMSK1 |= (1 << TOIE1);   // enable timer overflow interrupt
  interrupts();             // enable all interrupts
  //--------------------------timer setup
}
ISR(TIMER1_OVF_vect)        // interrupt service routine - tick every 0.5sec
{
  TCNT1 = timer1_counter;   // set timer
  //  Serial.println(millis());
  //  Serial.println(encoder);
  pv_speed = 60 * (encoder /7) / 0.5;
  encoder = 0;
}
void detect_a() {
  //  Serial.println(millis());
  encoder += 1;  //count of pulses
  m_direction = digitalRead(pin_b);  //direction of motor to pin b
}
void loop() {
  unsigned long currentMillis = millis();
  if (currentMillis - lastExecutedMillis >= DELAY1) {
    lastExecutedMillis = currentMillis;
    digitalWrite(pin_fwd, 0);       //run motor backward
    digitalWrite(pin_bwd, 1);       //run motor backward
    analogWrite(pin_pwm, sv_speed); //set motor speed
    Serial.print("Speed of base motor(rpm) is : ");
    Serial.print(pv_speed);         //Print speed value to Computer
    Serial.print("  --  ");
    Serial.print("Speed of top motor(rpm) is : ");
    Serial.print(pv_speed/200);         //Print speed value to Computer
    Serial.print("  --  ");
    Serial.print("Direction = ");
    Serial.println(m_direction);
    //
  }
}