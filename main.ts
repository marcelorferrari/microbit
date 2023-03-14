function iniciar () {
    motor = "carro"
    movimento = "desligado"
    sentido = "cima"
    tempo = 0
    tempoOperacao = 0
}
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    if (movimento == "desligado") {
        movimento = "ligado"
    } else {
        movimento = "desligado"
        parar()
    }
    Setas(movimento)
    music.playSoundEffect(music.builtinSoundEffect(soundExpression.slide), SoundExpressionPlayMode.InBackground)
})
input.onButtonPressed(Button.A, function () {
    executar("cima", 255, 4000)
    music.playSoundEffect(music.builtinSoundEffect(soundExpression.giggle), SoundExpressionPlayMode.InBackground)
})
input.onLogoEvent(TouchButtonEvent.LongPressed, function () {
    if (motor == "carro") {
        motor = "guincho"
    } else {
        motor = "carro"
    }
    Setas(motor)
    music.playSoundEffect(music.builtinSoundEffect(soundExpression.mysterious), SoundExpressionPlayMode.InBackground)
})
input.onButtonPressed(Button.B, function () {
    executar("baixo", -255, 4000)
    music.playSoundEffect(music.builtinSoundEffect(soundExpression.giggle), SoundExpressionPlayMode.InBackground)
})
function parar () {
    movimento = "desligado"
    executar(sentido, 0, 0)
}
function Setas (icone: string) {
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
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
            . . . . .
            . # # # .
            . # . # .
            . # # # .
            . . . . .
            `)
        basic.showLeds(`
            . . # . .
            . # # # .
            # # . # #
            . # # # .
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
        basic.showLeds(`
            . . . . .
            . # . # .
            . . # . .
            . # . # .
            . . . . .
            `)
    }
}
function executar (S: string, V: number, T: number) {
    sentido = S
    if (movimento == "ligado") {
        velocidade = V
        tempo = T
        tempoOperacao = input.runningTime()
    } else {
        velocidade = 0
        tempo = 0
    }
    if (motor == "carro") {
        basic.showString("C")
        robotbit.MotorRun(robotbit.Motors.M1A, velocidade)
    } else {
        basic.showString("G")
        robotbit.MotorRun(robotbit.Motors.M1B, velocidade)
    }
}
let tempoAgora = 0
let velocidade = 0
let tempoOperacao = 0
let tempo = 0
let sentido = ""
let movimento = ""
let motor = ""
music.setVolume(255)
music.playSoundEffect(music.builtinSoundEffect(soundExpression.slide), SoundExpressionPlayMode.UntilDone)
basic.showString("Olá!")
iniciar()
basic.forever(function () {
    tempoAgora = input.runningTime()
    if (movimento == "ligado" && tempo > 0) {
        if (tempoAgora - tempoOperacao > tempo) {
            parar()
        }
    }
    Setas(movimento)
    Setas(sentido)
    Setas(motor)
})
