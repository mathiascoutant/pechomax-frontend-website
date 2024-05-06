import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Button } from './Form/Button'
import useDeleteSpecies from '../hooks/species/useDeleteSpecies'

interface SpeciesListItemProps {
  name: string
  id: string
  darker?: boolean
  links?: boolean
}

export function SpeciesListItem({ name, darker, id, links = true }: SpeciesListItemProps) {
  const { mutate, isPending } = useDeleteSpecies()
  const handleDelete = useCallback(() => mutate({ id }), [id])

  return (
    <div className={`w-full grid grid-cols-[1fr_1fr_0.5fr_0.5fr] gap-6 ${darker && 'bg-slate-300'} py-2 px-2`}>
      <span>{id}</span>
      <span>{name}</span>
      {links ? (
        <>
          <Link to={`/species/update/${id}`} aria-disabled={isPending}>
            <Button>Details</Button>
          </Link>
          <Button onClick={handleDelete} disabled={isPending}>
            Supprimer
          </Button>
        </>
      ) : (
        <>
          <div></div>
          <div></div>
        </>
      )}
    </div>
  )
}
