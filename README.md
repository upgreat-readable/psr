# PSR

[![NPM](https://nodei.co/npm/@upgreat-readable/psr.png?compact=true)](https://npmjs.org/package/@upgreat-readable/psr)

Программа сравнения решений. Пакет расчёта метрик, СТЭР, СТАР и ОТАР для участников [конкурса ПРО//ЧТЕНИЕ](https://ai.upgreat.one/).

## Usage

```ts
import MetricService from '@upgreat-readable/psr';

// prepare
const readyToPsrEntity: EnterGlobalObject = {};

const metrics = new MetricService().calculate(readyToPsrEntity);
```

## Права

Код предназначен для участников конкурса [ПРО//ЧТЕНИЕ](https://ai.upgreat.one/) у которых одобрена заявка на участие в конкурсе.
