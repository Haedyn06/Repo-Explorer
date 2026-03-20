import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import RepoStats from '@/components/RepoStats.vue'

describe('RepoStats', () => {

    it('All Properties are present', () => {
        const data = {
            stargazers_count: 50,
            forks_count: 4,
            open_issues_count: 25,
            default_branch: 'main',
            language: 'C++',
            license: { name: 'MIT License' }
        }

        const obj = mount(RepoStats, {props: { repo: data }})

        const i = obj.findAll('li')

        expect(i[0].find('p').text()).toBe('50') // Stars
        expect(i[1].find('p').text()).toBe('4') // Forks 
        expect(i[2].find('p').text()).toBe('25') // Open Issues
        expect(i[3].find('p').text()).toBe('main')
        expect(i[4].find('p').text()).toBe('C++')
        expect(i[5].find('p').text()).toBe('MIT License')
    })

    
    it('Some properties are missing', () => {
        const data = {
            stargazers_count: 50,
            open_issues_count: 25,
            default_branch: 'main',
        }

        const obj = mount(RepoStats, {
            props: { repo: data }
        })

        const i = obj.findAll('li')

        expect(i[0].find('p').text()).toBe('50')
        expect(i[1].find('p').text()).toBe('0') 
        expect(i[2].find('p').text()).toBe('25')
        expect(i[3].find('p').text()).toBe('main')
        expect(i[4].find('p').text()).toBe('N/A')
        expect(i[5].find('p').text()).toBe('N/A')
    })


    it('All properties are missing', () => {
        const data = {}

        const obj = mount(RepoStats, {props: { repo: data }})

        const i = obj.findAll('li')

        expect(i[0].find('p').text()).toBe('0')
        expect(i[1].find('p').text()).toBe('0') 
        expect(i[2].find('p').text()).toBe('0')
        expect(i[3].find('p').text()).toBe('N/A')
        expect(i[4].find('p').text()).toBe('N/A')
        expect(i[5].find('p').text()).toBe('N/A')
    })

})