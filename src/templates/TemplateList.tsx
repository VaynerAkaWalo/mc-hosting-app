import * as React from "react";
import {useEffect} from "react";
import {Template, template} from "./Template.tsx";

export function TemplateList() {
  const [templates, setTemplates] = React.useState<template[]>([])

  useEffect(() => {
    setTemplates([
      {
        name: "Lockout",
        description: "Compete in bingo challenges to claim victory! This gameplay focuses on team-based objective completion.",
        opts: {
          VERSION: "1.21.3",
          TYPE: "FABRIC",
          MODRINTH_PROJECTS: "fabric-api,lithium",
          MODS: "https://github.com/marin774/lockout-fabric/releases/download/v0.9.3/lockout-fabric-0.9.3.jar",
        }
      }
    ])
  }, []);

  return (
    <ul className="flex flex-col min-w-1/4 max-w-5/12 h-2/3 justify-evenly">
      {templates.map((template) => (
        <Template name={template.name} description={template.description} opts={template.opts}/>
      ))}
    </ul>
  )
}
