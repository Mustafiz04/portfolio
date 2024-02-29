import { Colors } from './colors';

export enum Stack {
  // Languages
  java,
  go,
  typescript,
  javascript,
  python,

  // Frontend
  react,
  nextjs,

  // Backend
  graphql,
  node,
  django,

  // Cloud
  aws,
  gcp,

  // Messaging
  nats,
  kafka,

  // Databases
  arangodb,
  redis,
  postgres,
  mongo,
  mysql,

  // Tools
  docker,
  kubernetes,
  terraform,
}

export const WorkStack = [
  Stack.javascript,
  Stack.java,
  Stack.typescript,
  Stack.python,
  Stack.react,
  Stack.nextjs,
  Stack.aws,
  Stack.docker,
  Stack.kafka,
  Stack.graphql,
  Stack.postgres,
  Stack.redis,
  Stack.mongo,
  Stack.mysql
];

type StackInfoMap = {
  value: string;
  color: string;
};

export const StackInfo: Record<Stack, StackInfoMap> = {
  [Stack.java]: {
    value: 'Java',
    color: Colors.java,
  },
  [Stack.mysql]: {
    value: 'mysql',
    color: Colors.java,
  },
  [Stack.nextjs]: {
    value: 'nextjs',
    color: Colors.java,
  },
  [Stack.typescript]: {
    value: 'TypeScript',
    color: Colors.typescript,
  },
  [Stack.javascript]: {
    value: 'JavaScript',
    color: Colors.javascript,
  },
  [Stack.go]: {
    value: 'Go',
    color: Colors.go,
  },
  [Stack.react]: {
    value: 'React',
    color: Colors.react,
  },
  [Stack.graphql]: {
    value: 'GraphQL',
    color: Colors.graphql,
  },
  [Stack.aws]: {
    value: 'AWS',
    color: Colors.aws,
  },
  [Stack.gcp]: {
    value: 'Google Cloud',
    color: Colors.gcp,
  },
  [Stack.python]: {
    value: 'Python',
    color: Colors.python,
  },
  [Stack.node]: {
    value: 'Node',
    color: Colors.node,
  },
  [Stack.django]: {
    value: 'Django',
    color: Colors.django,
  },
  [Stack.nats]: {
    value: 'NATS',
    color: Colors.nats,
  },
  [Stack.kafka]: {
    value: 'Kafka',
    color: Colors.kafka,
  },
  [Stack.arangodb]: {
    value: 'ArangoDB',
    color: Colors.arangodb,
  },
  [Stack.postgres]: {
    value: 'Postgres',
    color: Colors.postgres,
  },
  [Stack.redis]: {
    value: 'Redis',
    color: Colors.redis,
  },
  [Stack.mongo]: {
    value: 'MongoDB',
    color: Colors.mongo,
  },
  [Stack.docker]: {
    value: 'Docker',
    color: Colors.docker,
  },
  [Stack.kubernetes]: {
    value: 'Kubernetes',
    color: Colors.kubernetes,
  },
  [Stack.terraform]: {
    value: 'Terraform',
    color: Colors.terraform,
  },
};