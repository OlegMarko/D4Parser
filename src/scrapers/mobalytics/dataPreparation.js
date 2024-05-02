export function prepareData(data) {
  let build = data.build
  let variants = build?.variants[0];

  return {
    build_url: `https://mobalytics.gg/diablo-4/builds/${data.class.slug}/${data.id}`,
    name: build.name,
    slug: data.id,
    class: prepareClass(data.class),
    tier: prepareTier(data.tier),
    tags: prepareTags(data.season, data.types),
    summary: build.buildSummary,
    core_skills: prepareCoreSkills(variants?.assignedSkills),
    selected_skills: prepareSelectedSkills(variants?.skills),
    gear: prepareGear(variants?.gear),
    gems: prepareGems(variants?.gems),
    seasonal_mechanic: prepareSeasonalMechanic(variants?.seneschalCompanion),
    creator: prepareCreator(build.author),
    last_updated: build.updatedAt,
    leveling_path: prepareLevelingPath(variants?.skills),
    class_mechanic: prepareClassMechanic(build?.variants),
    skill_rotation: build.gameplayLoop,
    paragon: prepareParagon(variants?.paragonBoards),
    str_and_weak: null,
  };
}

function prepareLevelingPath(data) {
  const res = []

  if (data != null) {
    data.forEach((i, key) => {
      res.push({
        level: key + 2,
        choice: {
          action: i.actionType,
          name: i.skill.name,
          skill: i.skill.slug
        }
      });
    })
  }

  return JSON.stringify(res);
}

function prepareCoreSkills(data) {
  const res = []

  data.map(i => {
    res.push({name: i.skill.name, slug: i.skill.slug})
  });

  return JSON.stringify(res);
}

function findGroupKey(grouped, slug) {
  const possibleKeys = Object.keys(grouped).filter(key => slug.startsWith(key));

  if (possibleKeys.length > 0) {
    return possibleKeys.reduce((a, b) => a.length < b.length ? a : b);
  }

  return slug;
}

function prepareSelectedSkills(data) {
  let res = [];
  let uniqueData = [];
  let seenSlugs = new Set();

  data?.forEach(item => {
    if (!seenSlugs.has(item.skill.slug)) {
      seenSlugs.add(item.skill.slug);
      uniqueData.push(item);
    }
  });

  let grouped = {};

  uniqueData.forEach(item => {
    const slug = item.skill.slug;
    const groupKey = findGroupKey(grouped, slug);

    if (!grouped[groupKey]) {
      grouped[groupKey] = [];
    }

    grouped[groupKey].push(item);
  });

  for (const [key, group] of Object.entries(grouped)) {
    let mainSkill = group[0]?.skill

    if (mainSkill?.maxRank > 0) {
      res.push({
        skill_group: {
          name: mainSkill.section.name,
          slug: mainSkill.section.slug,
        },
        active_skills: {
          name: mainSkill.name,
          slug: mainSkill.slug,
          type: {
            name: mainSkill.type.name
          }
        },
        rank: mainSkill.maxRank,
        upgrade_one: group[1]?.skill.slug,
        upgrade_two: group[2]?.skill.slug
      })
    }
  }

  return JSON.stringify(res);
}

function prepareTags(season, types) {
  const res = []

  if (season) {
    res.push({name: season.name, slug: season.id});
  }

  if (types) {
    res.push(...types.map(i => {
      return {name: i.name, slug: i.id}
    }))
  }

  return JSON.stringify(res)
}

function prepareSeasonalMechanic(data) {
  const res = []

  data?.map(i => {
    res.push({
      governingStone: i.governingStone?.governingStone?.name,
      tuningStones: i.tuningStones?.map(v => v?.tuningStone?.name),
    })
  });

  return JSON.stringify(res);
}

function prepareClass(data) {
  return JSON.stringify(
    {name: data.name, slug: data.slug}
  );
}

function prepareTier(data) {
  return JSON.stringify(
    {name: data.name, slug: data.slug}
  );
}

function prepareParagon(data) {
  const res = []

  data?.forEach((i, key) => {
    if (i.board || i.glyph) {
      res.push({
        board: i.board,
        glyph: i.glyph
      })
    }
  });

  return JSON.stringify(res);
}

function prepareCreator(data) {
  return JSON.stringify(data);
}

function prepareGear(data) {
  return JSON.stringify(data);
}
function prepareGems(data) {
  return JSON.stringify(data);
}

function prepareClassMechanic(data) {
  const res = []

  if (data[0].boons) {
    data[0].boons?.map(i => {
      if (i.value) {
        res.push(i)
      }
    })
  }
  if (data[0].summons) {
    res.push(data[0].summons)
  }
  if (data[0].specialization) {
    res.push(data[0].specialization)
  }
  if (data[0].expertise) {
    res.push(data[0].expertise)
  }
  if (data[0].enchantments) {
    res.push(data[0].enchantments)
  }

  return JSON.stringify(res);
}
