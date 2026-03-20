export type EvidenceBadge = "Seguro" | "Clasificado" | "Vulnerable";

export type EvidenceType =
  | "Album"
  | "Analisis Web"
  | "Era"
  | "Personaje"
  | "Ciudad"
  | "Documento"
  | "Organizacion";

export type RecoveredEvidence = {
  id: string;
  title: string;
  type: EvidenceType;
  yearOrRef: string;
  badge: EvidenceBadge;
  shortDescription: string;
  details: {
    section: string;
    items: string[];
  }[];
};

export const RECOVERED_EVIDENCE: RecoveredEvidence[] = [
  {
    id: "blurryface",
    title: "Blurryface",
    type: "Album",
    yearOrRef: "2015-2017",
    badge: "Clasificado",
    shortDescription:
      "Inicio del ciclo: miedo personificado, nueve circulos y control sobre Tyler.",
    details: [
      {
        section: "Resumen ES",
        items: [
          "El PDF describe a Blurryface como la personificacion de los miedos e inseguridades de Tyler.",
          "Los nueve circulos del disco anticipan la logica de los nueve obispos y del sistema de DEMA.",
        ],
      },
      {
        section: "Summary EN",
        items: [
          "The PDF frames Blurryface as Tyler's personified fear and insecurity.",
          "The album's nine circles foreshadow the nine bishops and the wider DEMA system.",
        ],
      },
      {
        section: "Pruebas del PDF",
        items: [
          "La voz grave, los ojos rojos y el auto de `Heavydirtysoul` son leidos como seales de dominio mental.",
          "El bucle `Goner -> Heavydirtysoul` sostiene la idea de un ciclo que nunca termina del todo.",
        ],
      },
    ],
  },
  {
    id: "trench",
    title: "Trench",
    type: "Album",
    yearOrRef: "2018-2020",
    badge: "Seguro",
    shortDescription:
      "Cartografia del conflicto: DEMA, Banditos, cartas de Clancy y ruta de escape.",
    details: [
      {
        section: "Resumen ES",
        items: [
          "El PDF convierte a Trench en el mapa legible del universo: continente, ciudad, campamento y rutas de captura/escape.",
          "La trilogia `Jumpsuit`, `Nico and the Niners` y `Levitate` muestra que salir de DEMA no resuelve el ciclo por si solo.",
        ],
      },
      {
        section: "Summary EN",
        items: [
          "The PDF turns Trench into the readable map of the universe: continent, city, camp, and capture/escape routes.",
          "The `Jumpsuit`, `Nico and the Niners`, and `Levitate` trilogy shows that leaving DEMA does not solve the cycle on its own.",
        ],
      },
      {
        section: "Pruebas del PDF",
        items: [
          "`dmaorg.info` introduce el mensaje `EAST IS UP`, el mapa de DEMA y las primeras cartas de Clancy.",
          "Ned aparece como recurso narrativo clave y no solo como criatura visual de `Chlorine`.",
        ],
      },
    ],
  },
  {
    id: "scaled-and-icy",
    title: "Scaled And Icy",
    type: "Album",
    yearOrRef: "2021-2023",
    badge: "Vulnerable",
    shortDescription:
      "Propaganda de DEMA: brillo superficial, show controlado y guerra encubierta.",
    details: [
      {
        section: "Resumen ES",
        items: [
          "El PDF interpreta SAI como una era fabricada por DEMA para domesticar el mensaje y usar a Tyler/Clancy como rostro de entretenimiento.",
          "La frase `Clancy is dead` y el anagrama del titulo funcionan como el eje de encubrimiento de toda la era.",
        ],
      },
      {
        section: "Summary EN",
        items: [
          "The PDF reads SAI as a DEMA-manufactured era designed to tame the message and use Tyler/Clancy as entertainment.",
          "The `Clancy is dead` phrase and the album anagram drive the cover-up across the whole era.",
        ],
      },
      {
        section: "Pruebas del PDF",
        items: [
          "El livestream corta las performances mas desesperadas de Tyler con anuncios de los obispos.",
          "Keons traiciona al sistema, habilita la huida en `Saturday/The Outside` y deja su cuerpo como vasija para el contraataque.",
        ],
      },
    ],
  },
  {
    id: "clancy-era",
    title: "Clancy",
    type: "Era",
    yearOrRef: "2024-actualidad segun PDF",
    badge: "Clasificado",
    shortDescription:
      "Fase de rebelion abierta: Clancy vuelve a Trench, recluta gente y ataca DEMA desde dentro.",
    details: [
      {
        section: "Resumen ES",
        items: [
          "El PDF presenta la era Clancy como el comienzo del plan final para romper el ciclo.",
          "En `Overcompensate`, Clancy posee un cuerpo dentro de DEMA para enseñar y organizar resistencia.",
        ],
      },
      {
        section: "Summary EN",
        items: [
          "The PDF presents the Clancy era as the opening phase of the final plan to break the cycle.",
          "In `Overcompensate`, Clancy possesses a body inside DEMA to teach and organize resistance.",
        ],
      },
      {
        section: "Pruebas del PDF",
        items: [
          "`I am Clancy` recompone toda la historia desde la perspectiva del fugitivo.",
          "Paladin Strait, el fuego rojo/amarillo y las antorchas marcan la nueva frontera visual de la guerra.",
        ],
      },
    ],
  },
  {
    id: "clancy",
    title: "Clancy",
    type: "Personaje",
    yearOrRef: "Caso 15398642_14",
    badge: "Clasificado",
    shortDescription:
      "Fugitivo, narrador y excepcion del sistema; el PDF termina alineandolo con Tyler.",
    details: [
      {
        section: "Resumen ES",
        items: [
          "Clancy escribe cartas sobre DEMA, Trench, Voldsoy y su propia experiencia de captura y escape.",
          "El PDF termina sosteniendo que Tyler es Clancy o, al menos, ocupa plenamente ese rol narrativo.",
        ],
      },
      {
        section: "Summary EN",
        items: [
          "Clancy writes letters about DEMA, Trench, Voldsoy, and his own experience of capture and escape.",
          "The PDF ultimately argues that Tyler is Clancy or fully inherits that narrative role.",
        ],
      },
      {
        section: "Pruebas del PDF",
        items: [
          "Las cartas 8 y 9 contextualizan `Saturday`, `The Outside` y el uso de los cuernos de Ned.",
          "El dossier de 2024 revierte la propaganda oficial con el mensaje oculto `STILL ALIVE`.",
        ],
      },
    ],
  },
  {
    id: "dema",
    title: "DEMA",
    type: "Ciudad",
    yearOrRef: "Municipio Sagrado",
    badge: "Vulnerable",
    shortDescription:
      "Centro de control de los obispos, torre funeraria y arquitectura de confinamiento.",
    details: [
      {
        section: "Resumen ES",
        items: [
          "El PDF define a DEMA como la ciudad donde los obispos controlan a la poblacion mediante vialismo, vigilancia y captura.",
          "Su forma se compara con una torre del silencio: una estructura ligada a muerte, separacion y uso de cuerpos.",
        ],
      },
      {
        section: "Summary EN",
        items: [
          "The PDF defines DEMA as the city where the bishops control the population through vialism, surveillance, and capture.",
          "Its shape is compared to a tower of silence: a structure linked to death, separation, and body use.",
        ],
      },
      {
        section: "Pruebas del PDF",
        items: [
          "Los nueve obispos se asocian a las canciones/circulos de `Blurryface` cuando el mapa se orienta con `EAST IS UP`.",
          "El municipio emite mensajes legales, sobres rojos y documentos internos para controlar la narrativa.",
        ],
      },
    ],
  },
  {
    id: "banditos",
    title: "Banditos",
    type: "Organizacion",
    yearOrRef: "Resistencia Amarilla",
    badge: "Seguro",
    shortDescription:
      "Rebelion asentada en Trench; usan el amarillo como camuflaje contra obispos que no pueden verlo.",
    details: [
      {
        section: "Resumen ES",
        items: [
          "Los Banditos viven en Trench y buscan sacar gente de DEMA para romper el sistema del vialismo.",
          "Josh figura como lider y portador de la antorcha, con un plan de largo plazo para cambiar el curso de la guerra.",
        ],
      },
      {
        section: "Summary EN",
        items: [
          "The Banditos live in Trench and try to get people out of DEMA to break the vialist system.",
          "Josh appears as leader and torchbearer, carrying a long-term plan to change the course of the war.",
        ],
      },
      {
        section: "Pruebas del PDF",
        items: [
          "Las cintas y petalos amarillos guian a Tyler fuera del control episcopal en la trilogia de Trench.",
          "Las antorchas al final de `The Outside` anuncian la reunion para la ofensiva final.",
        ],
      },
    ],
  },
  {
    id: "keons",
    title: "Keons",
    type: "Personaje",
    yearOrRef: "Obispo / Vasija",
    badge: "Clasificado",
    shortDescription:
      "Obispo ambiguo que termina ayudando a Clancy y abriendo la ofensiva desde dentro.",
    details: [
      {
        section: "Resumen ES",
        items: [
          "El PDF identifica a Keons como el obispo mas cercano a ayudar a Tyler dentro del sistema.",
          "Su muerte y posterior posesion convierten su cuerpo en herramienta para incendiar DEMA desde dentro.",
        ],
      },
      {
        section: "Summary EN",
        items: [
          "The PDF identifies Keons as the bishop most inclined to help Tyler from inside the system.",
          "His death and later possession turn his body into the tool used to set DEMA on fire from within.",
        ],
      },
      {
        section: "Pruebas del PDF",
        items: [
          "La imagen `weapon` y las cartas 8/9 conectan los cuernos de Ned con `seize Keons`.",
          "El primer circulo de `Blurryface` tapado por cinta roja se asocia a Keons tras `The Outside`.",
        ],
      },
    ],
  },
  {
    id: "red-envelope",
    title: "Sobre Rojo de DEMA",
    type: "Documento",
    yearOrRef: "15 Feb 2024",
    badge: "Clasificado",
    shortDescription:
      "Paquete de evidencia con mapa, aviso legal y carta que desmiente la muerte de Clancy.",
    details: [
      {
        section: "Resumen ES",
        items: [
          "El sobre distribuido a 1500 personas incluye mapa actualizado de Trench, mensajes institucionales y una carta de Clancy.",
          "Las letras duplicadas forman `STILL ALIVE`, desmontando la propaganda de `Clancy is dead`.",
        ],
      },
      {
        section: "Summary EN",
        items: [
          "The envelope sent to 1500 people includes an updated Trench map, institutional notices, and a Clancy letter.",
          "Repeated letters spell `STILL ALIVE`, dismantling the `Clancy is dead` propaganda.",
        ],
      },
      {
        section: "Pruebas del PDF",
        items: [
          "Paladin Strait aparece nombrado explicitamente por primera vez en este material.",
          "La carta remarca que Clancy ya no se siente impotente y que la chispa debe convertirse en antorcha.",
        ],
      },
    ],
  },
  {
    id: "evidence-a-web",
    title: "Evidence A: Tecnologia Web",
    type: "Analisis Web",
    yearOrRef: "Ref A-01",
    badge: "Vulnerable",
    shortDescription: "Stack detectado: Drupal + AWS.",
    details: [
      {
        section: "Hallazgos tecnicos",
        items: [
          "CMS identificado: Drupal.",
          "Infraestructura principal alojada en AWS.",
        ],
      },
      {
        section: "Riesgo",
        items: [
          "Superficie de ataque dependiente de modulos y parches.",
          "Recomendado: auditoria continua y hardening de endpoints.",
        ],
      },
    ],
  },
  {
    id: "evidence-b-ssl",
    title: "Evidence B: SSL",
    type: "Analisis Web",
    yearOrRef: "Ref B-02",
    badge: "Seguro",
    shortDescription: "Canal HTTPS y certificados SSL validos.",
    details: [
      {
        section: "Hallazgos tecnicos",
        items: [
          "Certificados SSL validos y cadena de confianza consistente.",
          "Cifrado de trafico en transito activo.",
        ],
      },
      {
        section: "Riesgo",
        items: [
          "Baja exposicion a interceptacion pasiva.",
          "Mantener renovacion y monitoreo de certificados.",
        ],
      },
    ],
  },
];
