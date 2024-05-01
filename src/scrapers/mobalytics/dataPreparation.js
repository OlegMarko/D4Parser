export function prepareData(data) {
  let build = data.build
  let variants = build?.variants[0];

  return {
    build_url: `https://mobalytics.gg/diablo-4/builds/${data.class.slug}/${data.id}`,
    build_name: build.name,
    class: JSON.stringify(data.class),
    tier: JSON.stringify(data.tier),
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
      res.push({ [key + 2]: i?.skill?.slug });
    })
  }

  return JSON.stringify(res);
}

function prepareCoreSkills(data) {
  const res = []

  data.map(i => {
    res.push(i.skill)
  });

  return JSON.stringify(res);
}

function prepareSelectedSkills(data) {
  const res = {};

  data?.forEach(i => {
    if (i.skill.maxRank > 0) {
      let sectionSlug = i.skill.sectionSlug;
      if (!res[sectionSlug]) {
        res[sectionSlug] = [];
      }
      if (!res[sectionSlug].includes(i.skill.slug)) {
        res[sectionSlug].push(i.skill.slug);
      }
    }
  });

  return JSON.stringify(res);
}

function prepareTags(season, types) {
  return JSON.stringify([
    season?.name,
    ...types.map(i => i.name)
  ]);
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

function prepareParagon(data) {
  return JSON.stringify(data);
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
    res.push(data[0].boons)
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
