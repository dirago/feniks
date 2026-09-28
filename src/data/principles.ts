import type { Principle } from '@/types/content'

export const principles: readonly Principle[] = [
  {
    title: 'Architecture',
    description:
      'Séparer clairement métier, infrastructure et interface pour éviter qu’une codebase devienne impossible à faire évoluer.',
  },
  {
    title: 'Design System',
    description:
      'Construire des composants cohérents, accessibles et réutilisables plutôt que réinventer l’interface feature après feature.',
  },
  {
    title: 'Tests',
    description:
      'Protéger les comportements importants et permettre aux équipes de refactorer sans travailler dans la peur.',
  },
  {
    title: 'Craftsmanship',
    description:
      'Favoriser un code lisible et explicite plutôt que des abstractions impressionnantes mais incompréhensibles.',
  },
  {
    title: 'Produit',
    description:
      'Chercher le bon équilibre entre qualité technique, expérience utilisateur, performance et contraintes produit.',
  },
]
