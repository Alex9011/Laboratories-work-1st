function* roundRobinGenerator(list) {
    let index = 0;
    
    while (true) {
        yield list[index];
        index = (index + 1) % list.length;
    }
}

function consumeIteratorWithTimeout(iterator, timeoutSeconds, processingCallback) {
    console.log(`\nПочинаємо обробку ітератора на ${timeoutSeconds} секунд...\n`);
    
    const startTime = Date.now();
    const endTime = startTime + (timeoutSeconds * 1000);
    let iterationCount = 0;
    
    while (Date.now() < endTime) {
        const result = iterator.next();
        
        if (result.done) {
            console.log("Ітератор закінчився.");
            break;
        }
        
        iterationCount++;
        processingCallback(result.value, iterationCount);
        
        const pauseStart = Date.now();
        while (Date.now() - pauseStart < 250) {
        }
    }
    
    const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
    
    console.log(`\nОбробка завершена!`);
    console.log(`Всього ітерацій: ${iterationCount}`);
    console.log(`Минуло часу: ${elapsedTime} секунд`);
}

const sports = [
    "Футбол",
    "Баскетбол",
    "Теніс",
    "Волейбол",
    "Плавання",
    "Велоспорт",
    "Бокс"
];

console.log("Task 1: Generators and Iterators Demo");

const sportsGenerator = roundRobinGenerator(sports);

function processSport(sport, iteration) {
    const timestamp = new Date().toLocaleTimeString('uk-UA');
    console.log(`[${timestamp}] Ітерація #${iteration}: ${sport}`);
}

consumeIteratorWithTimeout(sportsGenerator, 3, processSport);
