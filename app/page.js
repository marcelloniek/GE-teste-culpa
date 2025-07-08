"use client";

import { useState } from 'react';

const perguntas = [
  "Es fällt mir schwer, mir selbst Fehler zu verzeihen, die ich in der Vergangenheit begangen habe, selbst wenn sie klein oder unabsichtlich waren.",
  "Ich fühle mich oft schuldig für Situationen oder Ereignisse, selbst wenn ich nicht eindeutig dafür verantwortlich bin.",
  "Ich glaube oft, für das Unglück oder Leiden der Menschen um mich herum verantwortlich zu sein.",
  "Es fällt mir schwer, Komplimente anzunehmen oder meine eigenen Stärken anzuerkennen, aufgrund häufiger Schuldgefühle.",
  "Ich durchlebe gedanklich oft frühere Fehler und empfinde immer wieder Scham oder Reue für diese Ereignisse.",
  "Ich habe in letzter Zeit darüber nachgedacht, dass ich kein Glück verdiene oder dass ich für etwas, was ich getan oder unterlassen habe, hart bestraft werden sollte.", // FLAG
  "Ich fühle mich häufig bedrückt oder traurig, weil ich denke, dass ich in vergangenen Situationen mehr oder besser hätte handeln können.",
  "Mein emotionales Leben und mein Selbstwertgefühl sind stark beeinträchtigt von häufigen Schuldgefühlen und Selbstvorwürfen.",
  "Ich habe Schwierigkeiten, Entscheidungen zu treffen, aus Angst, Fehler zu machen und mich danach schuldig zu fühlen.",
  "Ich vermeide den Kontakt zu Menschen oder Situationen aus Scham oder Angst, für vergangene Fehler verurteilt zu werden."
];

export default function TesteCulpa() {
  const [respostas, setRespostas] = useState(Array(10).fill(0));
  const [resultado, setResultado] = useState(null);
  const [indiceAtual, setIndiceAtual] = useState(0);

  const registrarResposta = (valor) => {
    const novasRespostas = [...respostas];
    novasRespostas[indiceAtual] = valor;
    setRespostas(novasRespostas);

    if (indiceAtual < perguntas.length - 1) {
      setIndiceAtual(indiceAtual + 1);
    } else {
      calcularResultado(novasRespostas);
    }
  };

  const calcularResultado = (respostas) => {
    if (respostas[5] >= 3) { // FLAG
      setResultado("ROT");
    } else {
      const soma = respostas.reduce((a, b) => a + b, 0);
      if (soma <= 20) setResultado("GRÜN");
      else if (soma <= 35) setResultado("GELB");
      else setResultado("ROT");
    }
  };

  const reiniciarTeste = () => {
    setRespostas(Array(10).fill(0));
    setResultado(null);
    setIndiceAtual(0);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md">
      {!resultado ? (
        <>
          <h2 className="text-xl font-semibold mb-4">Schuld-Test</h2>
          <p className="mb-4">{perguntas[indiceAtual]}</p>
          <div className="flex justify-between">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-700"
                onClick={() => registrarResposta(num)}
              >
                {num}
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm">Frage {indiceAtual + 1} von {perguntas.length}</p>
        </>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-4">Ergebnis: {resultado}</h2>
          {resultado === "GRÜN" && <p>Sie kommen mit diesem Thema gut zurecht und sind emotional stabil. Sie könnten anderen Menschen, die Hilfe benötigen, eine große Unterstützung sein.</p>}
          {resultado === "GELB" && <p>Es gibt deutliche Anzeichen emotionaler Schwierigkeiten, die bearbeitet werden sollten und mit Entschlossenheit und Unterstützung überwunden werden können.</p>}
          {resultado === "ROT" && <p>Ihre emotionalen Schwierigkeiten in diesem Bereich erfordern unbedingt professionelle Hilfe. Bitte suchen Sie baldmöglichst einen Arzt oder Psychologen auf.</p>}
          <button
            className="mt-4 px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded hover:bg-green-600 dark:hover:bg-green-700"
            onClick={reiniciarTeste}
          >
            Test neu starten
          </button>
        </>
      )}
    </div>
  );
}
