import { AllDiseases } from "../Views"
import { Articles } from "../Views"
import { CreateDisease } from "../Views"
import { EditDisease } from "../Views"
import { Diagnose } from "../Views"
import { ReadArticle } from "../Views"

import { DiseaseBaseLayout } from "../Views"

import { AllSymptoms } from "../Views/Symptoms"
import { CreateSymptom } from "../Views/Symptoms"
import { EditSymptom } from "../Views/Symptoms"
import { TrackSymptom } from "../Views/Symptoms"
import { TrackedSymptoms } from "../Views/Symptoms"
import { TrackedSymptom } from "../Views/Symptoms"
import { EditTrackedSymptom } from "../Views/Symptoms"
import { DoctorPermissions } from "../Views/Symptoms"
import { CreateDoctor } from "../Views/Symptoms"

import { Contact } from "../Views/Symptoms"


export default [
    {
        path: "/diseases",
        component: DiseaseBaseLayout,
        name: "DiseaseBaseLayout",
        redirect: { name: "AllDiseases" },
        meta: {
            requiresAuth: true,
            title: "Diseases",

        },
        children: [
            {
                path: "/diseases/all-diseases",
                component: AllDiseases,
                name: 'AllDiseases',
                meta: {
                    title: "Disease List"
                }
            },
            {
                path: "/diseases/articles",
                component: Articles,
                name: 'Articles',
                meta: {
                    title: "Articles",
                    requiresAuth: true
                }
            },
            {
                path: "/diseases/create-disease",
                component: CreateDisease,
                name: 'CreateDisease',
                meta: {
                    title: "CreateDisease",
                    requiresAuth: true
                }
            },
            {
                path: "/diseases/edit-disease/:uuid",
                component: EditDisease,
                name: 'EditDisease',
                props: true,
                meta: {
                    title: "Edit Disease",
                    requiresAuth: true
                }
            },
            {
                path: "/diseases/diagnose",
                component: Diagnose,
                name: 'Diagnose',
                props: true,
                meta: {
                    title: "Diagnose Disease",
                    requiresAuth: false
                }
            },
            {
                path: "/disease/read-article/:uuid",
                component: ReadArticle,
                name: "ReadArticle",
                props: true,
                meta: {
                    title: "Read Article",
                    requiresAuth: false
                }
            },
            {
                path: "/symptoms/all-symptoms",
                component: AllSymptoms,
                name: 'AllSymptoms',
                meta: {
                    title: "Symptoms List",
                    requiresAuth: true
                }
            },
            {
                path: "/symptoms/create-symptom",
                component: CreateSymptom,
                name: 'CreateSymptom',
                meta: {
                    title: "Create Symptom",
                    requiresAuth: true
                }
            },
            {
                path: "/symptoms/edit-symptom/:uuid",
                component: EditSymptom,
                name: 'EditSymptom',
                props: true,
                meta: {
                    title: "Edit Symptom",
                    requiresAuth: true
                }
            },
            {
                path: "/symptoms/track-symptom/:uuid",
                component: TrackSymptom,
                name: "TrackSymptom",
                props: true,
                meta: {
                    title: "Track Symptom",
                    requiresAuth: true
                }
            },
            {
                path: "/symptoms/tracked-symptoms",
                component: TrackedSymptoms,
                name: "TrackedSymptoms",
                props: true,
                meta: {
                    title: "Tracked Symptoms",
                    requiresAuth: true
                }
            },
            {
                path: "/symptoms/tracked-symptom/:uuid",
                component: TrackedSymptom,
                name: "TrackedSymptom",
                props: true,
                meta: {
                    title: "Tracked Symptoms",
                    requiresAuth: true
                }
            },
            {
                path: "/symptoms/edit-tracked-symptom/:uuid/:created_at",
                component: EditTrackedSymptom,
                name: "EditTrackedSymptom",
                props: true,
                meta: {
                    title: "Edit Tracked Symptoms",
                    requiresAuth: true
                }  
            },
            {
                path: "/symptoms/doctor-permissions",
                component: DoctorPermissions,
                name: "DoctorPermissions",
                props: true,
                meta: {
                    title: "Permissions",
                    requiresAuth: true
                }  
            },
            {
                path: "/symptoms/create-doctor",
                component: CreateDoctor,
                name: "CreateDoctor",
                props: true,
                meta: {
                    title: "Create doctor",
                    requiresAuth: true
                }  
            },
            {
                path: "/contact",
                component: Contact,
                name: "Contact",
                props: true,
                meta: {
                    title: "Contuct us",
                    requiresAuth: true
                } 
            }
        ]

    }
]