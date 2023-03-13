function pararGuincho () {
    tempo = 0
    movimento = "desligado"
    moverGuincho(0, 0)
    Setas(movimento)
}
function moverCarro (velocidade: number, duracao: number) {
    basic.showString("C")
    tempo = duracao
    tempoOperacao = input.runningTime()
    robotbit.MotorRun(robotbit.Motors.M1A, velocidade)
}
function iniciar () {
    motor = "carro"
    movimento = "desligado"
    sentido = "cima"
    tempo = 0
    tempoOperacao = 0
    music.setVolume(255)
}
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    music.playSoundEffect(music.builtinSoundEffect(soundExpression.giggle), SoundExpressionPlayMode.InBackground)
    if (movimento == "desligado") {
        movimento = "ligado"
    } else {
        movimento = "desligado"
    }
    Setas(movimento)
})
function botaoA () {
    sentido = "cima"
    if (motor == "carro") {
        moverCarro(255, 30000)
    } else {
        moverGuincho(255, 30000)
    }
}
input.onButtonPressed(Button.A, function () {
    music.playSoundEffect(music.builtinSoundEffect(soundExpression.soaring), SoundExpressionPlayMode.InBackground)
    botaoA()
})
input.onLogoEvent(TouchButtonEvent.LongPressed, function () {
    music.playSoundEffect(music.builtinSoundEffect(soundExpression.mysterious), SoundExpressionPlayMode.InBackground)
    if (motor == "carro") {
        motor = "guincho"
    } else {
        motor = "carro"
    }
    Setas(motor)
})
input.onButtonPressed(Button.B, function () {
    music.playSoundEffect(music.builtinSoundEffect(soundExpression.slide), SoundExpressionPlayMode.InBackground)
    botaoB()
})
function pararCarro () {
    tempo = 0
    movimento = "desligado"
    moverCarro(0, 0)
    Setas(movimento)
}
function Setas (icone: string) {
    if (icone == "carro") {
        basic.showLeds(`
            . # # . .
            . # . # .
            # # # # #
            # # # # #
            . # . # .
            `)
    }
    if (icone == "guincho") {
        basic.showLeds(`
            . . # . .
            . # # # .
            . . # . .
            # . # . #
            . # # # .
            `)
    }
    if (icone == "cima") {
        basic.showLeds(`
            . . # . .
            . # # # .
            # # # # #
            . # # # .
            . # # # .
            `)
    }
    if (icone == "baixo") {
        basic.showLeds(`
            . # # # .
            . # # # .
            # # # # #
            . # # # .
            . . # . .
            `)
    }
    if (icone == "ligado") {
        basic.showLeds(`
            . . # . .
            . # . # .
            # . # . #
            . # . # .
            . . # . .
            `)
    }
    if (icone == "desligado") {
        basic.showLeds(`
            # . . . #
            . # . # .
            . . # . .
            . # . # .
            # . . . #
            `)
    }
}
function moverGuincho (velocidade: number, duracao: number) {
    basic.showString("G")
    tempo = duracao
    tempoOperacao = input.runningTime()
    robotbit.MotorRun(robotbit.Motors.M1B, velocidade)
}
function botaoB () {
    sentido = "baixo"
    if (motor == "carro") {
        moverCarro(-255, 30000)
    } else {
        moverGuincho(-255, 30000)
    }
}
let tempoAgora = 0
let sentido = ""
let motor = ""
let tempoOperacao = 0
let movimento = ""
let tempo = 0
music.playSoundEffect(music.builtinSoundEffect(soundExpression.hello), SoundExpressionPlayMode.UntilDone)
basic.showString("Olá!")
iniciar()
basic.forever(function () {
    tempoAgora = input.runningTime()
    if (movimento == "ligado" && tempo > 0) {
        Setas(sentido)
        Setas(motor)
        if (motor == "carro") {
            if (tempoAgora - tempoOperacao > tempo) {
                pararGuincho()
            }
        }
        if (motor == "guincho") {
            if (tempoAgora - tempoOperacao > tempo) {
                pararGuincho()
            }
        }
    } else {
        Setas(movimento)
        Setas(sentido)
        Setas(motor)
    }
})
