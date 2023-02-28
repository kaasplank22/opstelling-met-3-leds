let tijd_2 = 0
serial.redirect(
SerialPin.USB_TX,
SerialPin.USB_RX,
BaudRate.BaudRate115200
)
serial.writeLine("test")
let tijd_1 = 0
basic.forever(function () {
    if (tijd_1 == 0) {
        if (pins.digitalReadPin(DigitalPin.P0) > 300) {
            tijd_1 = 1
            tijd_2 = input.runningTimeMicros()
        }
    }
    if (tijd_1 == 1) {
        if (pins.digitalReadPin(DigitalPin.P0) < 300) {
            tijd_1 = 2
        }
    }
    if (tijd_1 == 2) {
        if (pins.digitalReadPin(DigitalPin.P0) > 300) {
            tijd_1 = 0
            tijd_2 = input.runningTimeMicros()
        }
    }
    serial.writeLine("" + tijd_2 + "-" + tijd_1 + "=" + (tijd_2 - tijd_1))
})
