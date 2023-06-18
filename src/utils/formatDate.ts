export function formatDate(param: string) {
    const data = new Date(param);

    const diaSemana = data.toLocaleDateString('pt-BR', { weekday: 'long' });
    const dia = data.getDate();
    const mes = data.toLocaleDateString('pt-BR', { month: 'long' });
    const ano = data.getFullYear();

    return `${diaSemana}, ${dia} de ${mes} de ${ano}`;
}

export function formatTime(param: string) {
    const time = new Date(param);

    let hora = time.getHours();
    const minuto = time.getMinutes();
    const periodo = hora < 12 ? 'am' : 'pm';

    if (hora > 12) {
        hora -= 12;
    }

    return `${hora}:${minuto.toString().padStart(2, '0')} ${periodo}`;
}

export function calcTime(param: string) {

    const dataInicial = new Date().getTime()

    const diferenca = Math.abs(new Date(param).getTime() - dataInicial) / 1000; // Diferença em segundos

    const horas = Math.floor(diferenca / 3600); // Extraímos as horas completas
    const minutos = Math.floor((diferenca % 3600) / 60); // Extraímos os minutos completos
    const segundos = Math.floor(diferenca % 60); // Extraímos os segundos

    const formatarNumero = (num: any) => num.toString().padStart(2, '0'); // Função para formatar números com dois dígitos

    const diferencaFormatada = `${formatarNumero(horas)}:${formatarNumero(minutos)}:${formatarNumero(segundos)}`;
    return diferencaFormatada;
}

export function formatIsoDate(dataAtual: Date) {

    const deslocamentoFusoHorario = -180; // -3 horas * 60 minutos/hora = -180 minutos

    const minutos = dataAtual.getUTCMinutes() + deslocamentoFusoHorario;

    const dataAtualizada = new Date(dataAtual);
    dataAtualizada.setUTCMinutes(minutos);

    return dataAtualizada.toISOString();
}

export function isDifferentDay(data: Date) {
    const today = new Date()

    if (data.getDate() != today.getDate() || data.getFullYear() != today.getFullYear() || today.getMonth() != data.getMonth()) {
        return true
    }
    return false
}

export function getTimeDif(data1: Date, data2: Date) {
    return data2.getTime() - data1.getTime()
}

export function formatTimeFromMile(milissegundos: number) {
    // Converte os milissegundos em segundos
    const segundos = Math.floor(milissegundos / 1000);

    // Calcula as horas, minutos e segundos
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const segundosRestantes = segundos % 60;

    // Formata os valores com dois dígitos
    const horasFormatadas = String(horas).padStart(2, '0');
    const minutosFormatados = String(minutos).padStart(2, '0');
    const segundosFormatados = String(segundosRestantes).padStart(2, '0');

    // Retorna a string no formato HH:MM:SS
    return horasFormatadas + ':' + minutosFormatados + ':' + segundosFormatados;
}