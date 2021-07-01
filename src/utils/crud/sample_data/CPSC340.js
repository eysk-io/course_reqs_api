export const cpsc340 = {
    name: "CPSC",
    number: 340,
    credits: 3,
    preRequisites: [
        "CPSC 221",
        {
            oneof: [
                "MATH 152",
                "MATH 221",
                "MATH 223"
            ]
        },
        {
            oneof: [
                "MATH 200",
                "MATH 217",
                "MATH 226",
                "MATH 253",
                "MATH 254"
            ]
        },
        {
            oneof: [
                "STAT 241",
                "STAT 251",
                "ECON 325",
                "ECON 327",
                "MATH 302",
                "STAT 302",
                "MATH 318"
            ]
        },
    ],
    coRequisites: []
};

export const cpsc221 = {
    name: "CPSC",
    number: 221,
    credits: 4,
    preRequisites: [
        {
            oneOf: [
                "CPSC 210",
                "EECE 210",
                "CPEN 221"
            ]
        },
        {
            oneOf: [
                "CPSC 121",
                "CPSC 220"
            ]
        }
    ],
    coRequisites: []
};

export const cpsc210 = {
    name: "CPSC",
    number: 210,
    credits: 4,
    preRequisites: [
        {
            oneOf: [
                "CPSC 110", "CPSC 107"
            ]
        }
    ],
    coRequisites: []
};

export const cpsc110 = {
    name: "CPSC",
    number: 110,
    credits: 4,
    preRequisites: [],
    coRequisites: []
};

export const cpsc107 = {
    name: "CPSC",
    number: 107,
    credits: 3,
    preRequisites: ["CPSC 103"],
    coRequisites: []
};

export const cpsc103 = {
    name: "CPSC",
    number: 103,
    credits: 3,
    preRequisites: [],
    coRequisites: []
};

export const eece210 = "EECE 210";

export const cpen221 = {
    name: "CPEN",
    number: 221,
    credits: 4,
    preRequisites: ["APSC 160"],
    coRequisites: []
};

export const apsc160 = {
    name: "APSC",
    number: 160,
    credits: 3,
    preRequisites: [],
    coRequisites: []
};

export const cpsc121 = {
    name: "CPSC",
    number: 121,
    credits: 4,
    preRequisites: ["Principles of Mathematics 12 or Pre-calculus 12"],
    coRequisites: [
        {
            oneOf: [
                "CPSC 107",
                "CPSC 110"
            ]
        }
    ]
};

export const cpsc220 = "CPSC 220";

export const math152 = {
    name: "MATH",
    number: 152,
    credits: 3,
    preRequisites: [],
    coRequisites: ["MATH 101"]
};

export const math221 = {
    name: "MATH",
    number: 221,
    credits: 3,
    preRequisites: [
        {
            oneOf: [
                {
                    scoreOf: 64,
                    metric: "percentage",
                    courses: [
                        {
                            oneOf: [
                                "MATH 100",
                                "MATH 102",
                                "MATH 104",
                                "MATH 110",
                                "MATH 120",
                                "MATH 180",
                                "MATH 184"
                            ]
                        }
                    ]
                },
                "MATH 101",
                "MATH 103",
                "MATH 105",
                "MATH 121",
                "SCIE 001",
                {
                    advancedCredit: [
                        "MATH 100"
                    ]
                }
            ]
        }
    ],
    coRequisites: []
};

export const math100 = {
    name: "MATH",
    number: 100,
    credits: 3,
    preRequisites: [
        {
            oneOf: [
                [
                    "High-school calculus",
                    {
                        scoreOf: 80,
                        metric: "percentage",
                        courses: [
                            {
                                oneOf: [
                                    "BC Principles of Mathematics 12",
                                    "Pre-calculus 12"
                                ]
                            }
                        ]
                    }
                ]
            ]
        }
    ],
    coRequisites: []
}

export const math102 = {
    name: "MATH",
    number: 102,
    credits: 3,
    preRequisites: [
        "High School calculus",
        {
            scoreOf: 80,
            metric: "percentage",
            courses: [
                {
                    oneOf: [
                        "BC Principles of Mathematics 12",
                        "Pre-calculus 12"
                    ]
                }
            ]
        }
    ],
    coRequisites: []
}

export const math104 = {
    name: "MATH",
    number: 104,
    credits: 3,
    preRequisites: [
        "High School calculus",
        {
            scoreOf: 80,
            metric: "percentage",
            courses: [
                {
                    oneOf: [
                        "BC Principles of Mathematics 12",
                        "Pre-calculus 12"
                    ]
                }
            ]
        }
    ],
    coRequisites: []
}

export const math110 = {
    name: "MATH",
    number: 110,
    credits: 6,
    preRequisites: [
        {
            scoreOf: 80,
            metric: "percentage",
            courses: [
                {
                    oneOf: [
                        "BC Principles of Mathematics 12",
                        "Pre-calculus 12"
                    ]
                }
            ]
        }
    ],
    coRequisites: []
}

export const math120 = {
    name: "MATH",
    number: 120,
    credits: 4,
    preRequisites: [
        "High School Calculus",
        {
            oneOf: [
                {
                    scoreOf: 95,
                    metric: "percentage",
                    courses: [
                        {
                            oneOf: [
                                "BC Principles of Mathematics 12",
                                "Pre-calculus 12"
                            ]
                        }
                    ]
                },
                "permission from Mathematics Department Head"
            ]
        }
    ],
    coRequisites: []
}

export const math180 = {
    name: "MATH",
    number: 180,
    credits: 4,
    preRequisites: [
        {
            scoreOf: 80,
            metric: "percentage",
            courses: [
                {
                    oneOf: [
                        "BC Principles of Mathematics 12",
                        "Pre-calculus 12"
                    ]
                }
            ]
        }
    ],
    coRequisites: []
}

export const math184 = {
    name: "MATH",
    number: 184,
    credits: 4,
    preRequisites: [
        {
            scoreOf: 80,
            metric: "percentage",
            courses: [
                {
                    oneOf: [
                        "BC Principles of Mathematics 12",
                        "Pre-calculus 12"
                    ]
                }
            ]
        }
    ],
    coRequisites: []
}

export const math101 = {
    name: "MATH",
    number: 101,
    credits: 3,
    preRequisites: [
        {
            oneOf: [
                "MATH 100",
                "MATH 102",
                "MATH 104",
                "MATH 110",
                "MATH 120",
                "MATH 180",
                "MATH 184",
            ]
        }
    ],
    coRequisites: []
}

export const math103 = {
    name: "MATH",
    number: 103,
    credits: 3,
    preRequisites: [
        {
            oneOf: [
                "MATH 100",
                "MATH 102",
                "MATH 104",
                "MATH 110",
                "MATH 120",
                "MATH 180",
                "MATH 184",
            ]
        }
    ],
    coRequisites: []
}

export const math105 = {
    name: "MATH",
    number: 105,
    credits: 3,
    preRequisites: [
        {
            oneOf: [
                "MATH 100",
                "MATH 102",
                "MATH 104",
                "MATH 110",
                "MATH 120",
                "MATH 180",
                "MATH 184",
            ]
        }
    ],
    coRequisites: []
}

export const math121 = {
    name: "MATH",
    number: 121,
    credits: 4,
    preRequisites: [
        {
            oneOf: [
                {
                    scoreOf: 68,
                    metric: "percentage",
                    courses: ["MATH 120"]
                },
                {
                    scoreOf: 80,
                    metric: "percentage",
                    courses: [
                        {
                            oneOf: [
                                "MATH 100",
                                "MATH 102",
                                "MATH 104",
                                "MATH 180",
                                "MATH 184",
                            ]
                        }
                    ]
                },
                {
                    scoreOf: 5,
                    metric: "mark",
                    courses: ["AP Calculus AB"]
                }
            ]
        }
    ],
    coRequisites: []
}

export const scie001 = "SCIE 001";

export const math223 = {
    name: "MATH",
    number: 223,
    credits: 3,
    preRequisites: [
        {
            oneOf: [
                "MATH 121",
                {
                    scoreOf: 68,
                    metric: "percentage",
                    courses: {
                        oneOf: [
                            "MATH 101",
                            "MATH 103",
                            "MATH 105",
                            "SCIE 001"
                        ]
                    }
                },
            ]
        }
    ],
    coRequisites: []
}

export const math200 = {
    name: "MATH",
    number: 200,
    credits: 3,
    preRequisites: [
        {
            oneOf: [
                "MATH 101",
                "MATH 103",
                "MATH 105",
                "MATH 121",
                "SCIE 001"
            ]
        }
    ],
    coRequisites: []
}

export const math217 = {
    name: "MATH",
    number: 217,
    credits: 4,
    preRequisites: [
        {
            scoreOf: 68,
            metric: "percentage",
            oneOf: [
                "PHYS 102",
                "PHYS 108",
                "PHYS 118",
                "PHYS 153",
                "PHYS 158",
                "SCIE 001"
            ]
        }
    ],
    coRequisites: [
        {
            oneOf: [
                "MATH 152",
                "MATH 221",
                "MATH 223"
            ]
        }
    ]
}

export const phys102 = {
    name: "PHYS",
    number: 102,
    credits: 3,
    preRequisites: [
        {
            oneOf: [
                "PHYS 101",
                "PHYS 107"
            ]
        }
    ],
    coRequisites: [
        {
            oneOf: [
                "MATH 101",
                "MATH 103",
                "MATH 105",
                "MATH 121"
            ]
        }
    ]
}

export const phys101 = {
    name: "PHYS",
    number: 101,
    credits: 3,
    preRequisites: [
        {
            oneOf: [
                "PHYS 12",
                "PHYS 100"
            ]
        }
    ],
    coRequisites: [
        {
            oneOf: [
                "MATH 100",
                "MATH 102",
                "MATH 104",
                "MATH 110",
                "MATH 120",
                "MATH 180",
                "MATH 184",
            ]
        }
    ]
}

export const phys100 = {
    name: "PHYS",
    number: 100,
    credits: 3,
    preRequisites: [
        "Not open to students with credit for PHYS 12. Principles of Mathematics 12 or Pre-calculus 12 is required; Physics 11 is required for first-year students, strongly recommended for others"
    ],
    coRequisites: []
}

export const phys107 = {
    name: "PHYS",
    number: 107,
    credits: 3,
    preRequisites: [
        {
            oneOf: [
                {
                    scoreOf: 85,
                    metric: "percentage",
                    courses: [
                        "PHYS 12",
                        "MATH 12"
                    ]
                },
                {
                    scoreOf: 85,
                    metric: "percentage",
                    courses: [
                        "PHYS 12",
                        "PREC 12"
                    ]
                },
                {
                    scoreOf: 85,
                    metric: "percentage",
                    courses: [
                        "PHYS 12",
                        "CALC 12"
                    ]
                },
                {
                    scoreOf: 85,
                    metric: "percentage",
                    courses: [
                        "PHYS 100"
                    ]
                }
            ]
        }
    ],
    coRequisites: [
        {
            oneOf: [
                "MATH 100",
                "MATH 102",
                "MATH 104",
                "MATH 120",
                "MATH 180",
                "MATH 184",
            ]
        }
    ]
}

export const phys108 = {
    name: "PHYS",
    number: 108,
    credits: 3,
    preRequisites: [
        {
            oneOf: [
                "PHYS 106",
                "PHYS 107",
                {
                    scoreOf: 85,
                    metric: "percentage",
                    courses: [
                        "PHYS 101",
                        "PHYS 131"
                    ]
                },
                {
                    scoreOf: 85,
                    metric: "percentage",
                    courses: [
                        "PHYS 117"
                    ]
                }
            ]
        }
    ],
    coRequisites: [
        {
            oneOf: [
                "MATH 101",
                "MATH 103",
                "MATH 105",
                "MATH 121"
            ]
        }
    ]
}

export const phys118 = {
    name: "PHYS",
    number: 118,
    credits: 3,
    preRequisites: [
        {
            oneOf: [
                "PHYS 101",
                "PHYS 106",
                "PHYS 107",
                "PHYS 117",
                "PHYS 131",
                "PHYS 157",
            ]
        },
        {
            oneOf: [
                "MATH 100",
                "MATH 102",
                "MATH 104",
                "MATH 120",
                "MATH 180",
                "MATH 184",
            ]
        }
    ],
    coRequisites: [
        {
            oneOf: [
                "MATH 101",
                "MATH 103",
                "MATH 105",
                "MATH 121"
            ]
        }
    ]
}

export const phys106 = {
    name: "PHYS",
    number: 106,
    credits: 3,
    preRequisites: [
        {
            oneOf: [
                {
                    scoreOf: 85,
                    metric: "percentage",
                    courses: [
                        "PHYS 12",
                        "MATH 12"
                    ]
                },
                {
                    scoreOf: 85,
                    metric: "percentage",
                    courses: [
                        "PHYS 12",
                        "PREC 12"
                    ]
                },
                {
                    scoreOf: 85,
                    metric: "percentage",
                    courses: [
                        "PHYS 12",
                        "CALC 12"
                    ]
                },
                {
                    scoreOf: 85,
                    metric: "percentage",
                    courses: [
                        "PHYS 100"
                    ]
                }
            ]
        }
    ],
    coRequisites: [
        {
            oneOf: [
                "MATH 100",
                "MATH 102",
                "MATH 104",
                "MATH 120",
                "MATH 180",
                "MATH 184"
            ]
        }
    ]
}

export const phys117 = {
    name: "PHYS",
    number: 117,
    credits: 3,
    preRequisites: [
        {
            oneOf: [
                "PHYS 12",
                "PHYS 100"
            ]
        }
    ],
    coRequisites: [
        {
            oneOf: [
                "MATH 100",
                "MATH 102",
                "MATH 104",
                "MATH 120",
                "MATH 180",
                "MATH 184"
            ]
        }
    ]
}

export const phys131 = {
    name: "PHYS",
    number: 131,
    credits: 3,
    preRequisites: [
        {
            oneOf: [
                "PHYS 12",
                "PHYS 100"
            ]
        }
    ],
    coRequisites: [
        {
            oneOf: [
                "MATH 100",
                "MATH 102",
                "MATH 104",
                "MATH 120",
                "MATH 180",
                "MATH 184"
            ]
        }
    ]
}

export const phys157 = {
    name: "PHYS",
    number: 157,
    credits: 3,
    preRequisites: [
        {
            oneOf: [
                "PHYS 12",
                "PHYS 100"
            ]
        }
    ],
    coRequisites: [
        {
            oneOf: [
                "MATH 100",
                "MATH 102",
                "MATH 104",
                "MATH 120",
                "MATH 180",
                "MATH 184"
            ]
        }
    ]
}

export const phys153 = {
    name: "PHYS",
    number: 153,
    credits: 6,
    preRequisites: [
        {
            oneOf: [
                "PHYS 12",
                "PHYS 100"
            ]
        }
    ],
    coRequisites: [
        {
            oneOf: [
                "MATH 100",
                "MATH 102",
                "MATH 104",
                "MATH 120",
                "MATH 180",
                "MATH 184"
            ]
        }
    ]
}

export const phys158 = {
    name: "PHYS",
    number: 158,
    credits: 3,
    preRequisites: ["PHYS 157"],
    coRequisites: [
        {
            oneOf: [
                "MATH 101",
                "MATH 103",
                "MATH 105",
                "MATH 121"
            ]
        }
    ]
}

export const math226 = {
    name: "MATH",
    number: 226,
    credits: 3,
    preRequisites: [
        {
            oneOf: [
                {
                    scoreOf: 68,
                    metric: "percentage",
                    courses: [
                        "MATH 121"
                    ]
                },
                {
                    scoreOf: 80,
                    metric: "percentage",
                    courses: [
                        "MATH 101",
                        "MATH 103",
                        "MATH 105",
                        "SCIE 001",
                    ]
                },
            ]
        }
    ],
    coRequisites: [
        {
            oneOf: [
                "MATH 152",
                "MATH 221",
                "MATH 223"
            ]
        }
    ]
}

export const math253 = {
    name: "MATH",
    number: 253,
    credits: 3,
    preRequisites: [
        {
            oneOf: [
                "MATH 101",
                "MATH 103",
                "MATH 105",
                "SCIE 001",
            ]
        }
    ],
    coRequisites: []
}

export const math254 = {
    name: "MATH",
    number: 254,
    credits: 3,
    preRequisites: [
        "MATH 101",
        {
            oneOf: [
                "MATH 152",
                "MATH 221",
                "MATH 223",
            ]
        }
    ],
    coRequisites: [
        "MECH 222",
        "MECH 225"
    ]
}

export const mech222 = {
    name: "MECH",
    number: 222,
    credits: 3,
    preRequisites: [
        "MECH 220",
        "MECH 221",
    ],
    coRequisites: [
        "MECH 223",
        "MECH 225"
    ]
}

export const mech220 = {
    name: "MECH",
    number: 220,
    credits: 3,
    preRequisites: [
        "APSC 160",
        "MATH 101",
        "MATH 152",
        "PHYS 158",
        "PHYS 170",
        {
            oneOf: [
                "APSC 100",
                "APSC 150",
                "APSC 151",
            ]
        },
        {
            oneOf: [
                "BMEG 102",
                "PHYS 159",
            ]
        },
        {
            oneOf: [
                "APSC 176",
                "ENGL 112",
                "WRDS 150"
            ]
        }
    ],
    coRequisites: [
        "MECH 221"
    ]
}

export const phys170 = {
    name: "PHYS",
    number: 170,
    credits: 3,
    preRequisites: [
        {
            oneOf: [
                "PHYS 12",
                "PHYS 100",
            ]
        },
        {
            oneOf: [
                "MATH 100",
                "MATH 102",
                "MATH 104",
                "MATH 120",
                "MATH 180",
                "MATH 184",
            ]
        }
    ],
    coRequisites: [
        {
            oneOf: [
                "MATH 101",
                "MATH 103",
                "MATH 105",
                "MATH 121"
            ]
        }
    ]
}

export const apsc100 = {
    name: "APSC",
    number: 100,
    credits: 3,
    preRequisites: [],
    coRequisites: []
}

export const apsc150 = {
    name: "APSC",
    number: 150,
    credits: 5,
    preRequisites: [],
    coRequisites: []
}

export const apsc151 = {
    name: "APSC",
    number: 151,
    credits: 3,
    preRequisites: [],
    coRequisites: []
}

export const bmeg102 = {
    name: "BMEG",
    number: 102,
    credits: 3,
    preRequisites: [
        "PHYS 157"
    ],
    coRequisites: [
        "BMEG 101",
        "PHYS 158"
    ]
}

export const bmeg101 = {
    name: "BMEG",
    number: 101,
    credits: 3,
    preRequisites: [
        "PHYS 157",
        "MATH 100"
    ],
    coRequisites: [
        "BMEG 102",
        "PHYS 158",
        "PHYS 101",
    ]
}

export const phys159 = {
    name: "PHYS",
    number: 159,
    credits: 1,
    preRequisites: [
        {
            oneOf: [
                "PHYS 12",
                "PHYS 100"
            ]
        }
    ],
    coRequisites: [
        {
            oneOf: [
                "PHYS 157",
                "PHYS 158"
            ]
        }
    ]
}

export const apsc176 = {
    name: "APSC",
    number: 176,
    credits: 3,
    preRequisites: [],
    coRequisites: []
}


export const engl112 = "ENGL 112"

export const wrds150 = {
    name: "WRDS",
    number: 150,
    credits: 3,
    preRequisites: [],
    coRequisites: []
}

export const mech221 = {
    name: "MECH",
    number: 221,
    credits: 3,
    preRequisites: [
        "MATH 101",
        "MATH 152",
        "PHYS 158",
        "PHYS 170",
        {
            oneOf: [
                "BMEG 102",
                "PHYS 159",
            ]
        },
        {
            oneOf: [
                "APSC 176",
                "ENGL 112",
                "WRDS 150"
            ]
        }
    ],
    coRequisites: [
        "MECH 220",
        "MECH 224"
    ]
}

export const mech224 = {
    name: "MECH",
    number: 224,
    credits: 3,
    preRequisites: [],
    coRequisites: [
        "MECH 221"
    ]
}

export const mech223 = {
    name: "MECH",
    number: 223,
    credits: 7,
    preRequisites: [
        "MECH 220",
        "MECH 221"
    ],
    coRequisites: [
        "MECH 222"
    ]
}

export const mech225 = {
    name: "MECH",
    number: 225,
    credits: 1,
    preRequisites: [],
    coRequisites: [
        "MECH 222"
    ]
}

export const stat241 = {
    name: "STAT",
    number: 241,
    credits: 3,
    preRequisites: [
        {
            oneOf: [
                "MATH 101",
                "MATH 103",
                "MATH 105",
                "SCIE 001",
            ]
        }
    ],
    coRequisites: []
}

export const stat251 = {
    name: "STAT",
    number: 251,
    credits: 3,
    preRequisites: [
        {
            oneOf: [
                "MATH 101",
                "MATH 103",
                "MATH 105",
                "SCIE 001",
            ]
        }
    ],
    coRequisites: []
}

export const econ325 = {
    name: "ECON",
    number: 325,
    credits: 3,
    preRequisites: [
        {
            oneOf: [
                "ECON 101",
                "ECON 310"
            ]
        },
        {
            oneOf: [
                "ECON 102",
                "ECON 311"
            ]
        },
        {
            oneOf: [
                "MATH 100",
                "MATH 102",
                "MATH 104",
                "MATH 110",
                "MATH 120",
                "MATH 180",
                "MATH 184",
            ]
        },
        {
            oneOf: [
                "MATH 101",
                "MATH 103",
                "MATH 105",
                "MATH 121",
                "MATH 104",
                "MATH 110"
            ]
        }
    ],
    coRequisites: []
}

export const econ101 = {
    name: "ECON",
    number: 101,
    credits: 3,
    preRequisites: [],
    coRequisites: []
}

export const econ102 = {
    name: "ECON",
    number: 102,
    credits: 3,
    preRequisites: [],
    coRequisites: []
}

export const econ310 = {
    name: "ECON",
    number: 310,
    credits: 3,
    preRequisites: [
        "Third-year, fourth-year, or graduate standing"
    ],
    coRequisites: []
}

export const econ311 = {
    name: "ECON",
    number: 311,
    credits: 3,
    preRequisites: [
        "Third-year, fourth-year, or graduate standing"
    ],
    coRequisites: []
}

export const econ327 = {
    name: "ECON",
    number: 327,
    credits: 3,
    preRequisites: [
        {
            oneOf: [
                "ECON 101",
                "ECON 310"
            ]
        },
        {
            oneOf: [
                "ECON 102",
                "ECON 311"
            ]
        },
        {
            oneOf: [
                "MATH 100",
                "MATH 102",
                "MATH 104",
                "MATH 110",
                "MATH 120",
                "MATH 180",
                "MATH 184",
            ]
        },
        {
            oneOf: [
                "MATH 101",
                "MATH 103",
                "MATH 105",
                "MATH 121",
                "MATH 104",
                "MATH 110"
            ]
        }
    ],
    coRequisites: []
}

export const math302 = {
    name: "MATH",
    number: 302,
    credits: 3,
    preRequisites: [
        {
            oneOf: [
                "MATH 200",
                "MATH 217",
                "MATH 226",
                "MATH 253",
                "MATH 254",
            ]
        },
    ],
    coRequisites: []
}

export const stat302 = {
    name: "STAT",
    number: 302,
    credits: 3,
    preRequisites: [
        {
            oneOf: [
                "MATH 200",
                "MATH 217",
                "MATH 226",
                "MATH 253",
                "MATH 254",
            ]
        },
    ],
    coRequisites: []
}

export const math318 = {
    name: "MATH",
    number: 318,
    credits: 3,
    preRequisites: [
        {
            oneOf: [
                "MATH 152",
                "MATH 221",
                "MATH 223",
            ]
        },
        {
            oneOf: [
                "MATH 215",
                "MATH 255",
                "MATH 256",
                "MATH 258",
            ]
        },
    ],
    coRequisites: [
        {
            oneOf: [
                "MATH 256",
                "MATH 257",
                "MATH 316",
                "MATH 358",
                "MECH 358",
                "PHYS 312",
            ]
        }
    ]
}

export const math215 = {
    name: "MATH",
    number: 215,
    credits: 3,
    preRequisites: [
        {
            oneOf: [
                "MATH 101",
                "MATH 103",
                "MATH 105",
                "MATH 121",
                "SCIE 001",
            ]
        },
        {
            oneOf: [
                "MATH 152",
                "MATH 221",
                "MATH 223",
            ]
        },
    ],
    coRequisites: [
        {
            oneOf: [
                "MATH 200",
                "MATH 217",
                "MATH 226",
                "MATH 253",
                "MATH 254",
            ]
        }
    ]
}

export const math255 = {
    name: "MATH",
    number: 255,
    credits: 3,
    preRequisites: [
        {
            oneOf: [
                "MATH 101",
                "MATH 103",
                "MATH 105",
                "MATH 121",
                "SCIE 001",
            ]
        },
        {
            oneOf: [
                "MATH 152",
                "MATH 221",
                "MATH 223",
            ]
        },
    ],
    coRequisites: [
        {
            oneOf: [
                "MATH 200",
                "MATH 217",
                "MATH 226",
                "MATH 253",
                "MATH 254",
            ]
        }
    ]
}

export const math256 = {
    name: "MATH",
    number: 256,
    credits: 3,
    preRequisites: [
        {
            oneOf: [
                "MATH 101",
                "MATH 103",
                "MATH 105",
                "MATH 121",
                "SCIE 001",
            ]
        },
        {
            oneOf: [
                "MATH 152",
                "MATH 221",
                "MATH 223",
            ]
        },
    ],
    coRequisites: [
        {
            oneOf: [
                "MATH 200",
                "MATH 217",
                "MATH 226",
                "MATH 253",
                "MATH 263",
            ]
        }
    ]
}

export const math263 = "MATH 263";

export const math258 = {
    name: "MATH",
    number: 258,
    credits: 3,
    preRequisites: [
        "MATH 101",
        {
            oneOf: [
                "MATH 152",
                "MATH 221",
                "MATH 223"
            ]
        }
    ],
    coRequisites: [
        {
            oneOf: [
                "MECH 221",
                "MECH 224",
            ]
        }
    ]
}

export const math257 = {
    name: "MATH",
    number: 257,
    credits: 3,
    preRequisites: [
        {
            oneOf: [
                "MATH 215",
                "MATH 255",
                "MATH 256",
                "MATH 258"
            ]
        }
    ],
    coRequisites: []
}

export const math316 = {
    name: "MATH",
    number: 316,
    credits: 3,
    preRequisites: [
        {
            oneOf: [
                "MATH 215",
                "MATH 255",
                "MATH 256",
                "MATH 258"
            ]
        }
    ],
    coRequisites: []
}

export const math358 = {
    name: "MATH",
    number: 358,
    credits: 3,
    preRequisites: [
        {
            oneOf: [
                "MECH 224",
                "MECH 225",
            ]
        }
    ],
    coRequisites: []
}

export const mech358 = {
    name: "MECH",
    number: 358,
    credits: 3,
    preRequisites: [
        {
            oneOf: [
                "MECH 224",
                "MECH 225",
            ]
        }
    ],
    coRequisites: []
}

export const phys312 = {
    name: "PHYS",
    number: 312,
    credits: 3,
    preRequisites: [
        "MATH 215"
    ],
    coRequisites: []
}
