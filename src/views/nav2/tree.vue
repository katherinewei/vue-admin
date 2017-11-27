<template>

    <div>

        <el-row :gutter="20">
            <el-col :span="8">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span>基础用法</span>
                    </div>
                    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span>可选择</span>
                    </div>
                    <el-tree
                            :props="props"
                            :load="loadNode"
                            lazy
                            show-checkbox
                            @check-change="handleCheckChange">
                    </el-tree>
                </el-card>
            </el-col>

            <el-col :span="8">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span>默认展开和默认选中</span>
                    </div>
                    <el-tree
                            :data="data"
                            show-checkbox
                            node-key="id"
                            :default-expanded-keys="[2, 3]"
                            :default-checked-keys="[5]"
                            :props="defaultProps">
                    </el-tree>
                </el-card>
            </el-col>

        </el-row>
        <el-row :gutter="20" style="margin-top: 20px;">
            <el-col :span="8">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span>自定义节点内容</span>
                    </div>
                    <el-tree
                            :data="data"
                            :props="defaultProps"
                            show-checkbox
                            node-key="id"
                            default-expand-all
                            :expand-on-click-node="false"
                            :render-content="renderContent">
                    </el-tree>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span>节点过滤</span>
                    </div>
                    <el-input
                            placeholder="输入关键字进行过滤"
                            v-model="filterText">
                    </el-input>

                    <el-tree
                            class="filter-tree"
                            :data="data"
                            :props="defaultProps"
                            default-expand-all
                            :filter-node-method="filterNode"
                            ref="tree2">
                    </el-tree>
                </el-card>
            </el-col>

            <el-col :span="8">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span>手风琴模式</span>
                    </div>
                    <el-tree
                            :data="data"
                            :props="defaultProps"
                            accordion
                           >
                    </el-tree>
                </el-card>
            </el-col>
        </el-row>
    </div>

</template>

<script>
    let id = 1000;
    export default {
        data() {
            return {
                data: [
                {
                    id: 1,
                    label: '一级 1',
                    children: [{
                        id: 4,
                        label: '二级 1-1',
                        children: [{
                            id: 9,
                            label: '三级 1-1-1'
                        }, {
                            id: 10,
                            label: '三级 1-1-2'
                        }]
                    }]
                },
                    {
                        id: 2,
                        label: '一级 2',
                        children: [{
                            id: 5,
                            label: '二级 2-1'
                        }, {
                            id: 6,
                            label: '二级 2-2'
                        }]
                    },
                    {
                        id: 3,
                        label: '一级 3',
                        children: [{
                            id: 7,
                            label: '二级 3-1'
                        }, {
                            id: 8,
                            label: '二级 3-2'
                        }]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                props: {
                    label: 'name',
                    children: 'zones'
                },
                count: 1,
                filterText: '',
            };
        },
        watch: {
            filterText(val) {
                this.$refs.tree2.filter(val);
            }
        },
        methods: {
            handleCheckChange(data, checked, indeterminate) {
                console.log(data, checked, indeterminate);
            },
            handleNodeClick(data) {
                console.log(data);
            },
            loadNode(node, resolve) {
                if (node.level === 0) {
                    return resolve([{ name: 'region1' }, { name: 'region2' }]);
                }
                if (node.level > 3) return resolve([]);

                var hasChild;
                if (node.data.name === 'region1') {
                    hasChild = true;
                } else if (node.data.name === 'region2') {
                    hasChild = false;
                } else {
                    hasChild = Math.random() > 0.5;
                }

                setTimeout(() => {
                    var data;
                    if (hasChild) {
                        data = [{
                            name: 'zone' + this.count++
                        }, {
                            name: 'zone' + this.count++
                        }];
                    } else {
                        data = [];
                    }

                    resolve(data);
                }, 500);
            },


            append(data) {
                const newChild = { id: id++, label: 'testtest', children: [] };
                if (!data.children) {
                    this.$set(data, 'children', []);
                }
                data.children.push(newChild);
            },

            remove(node, data) {
                const parent = node.parent;
                const children = parent.data.children || parent.data;
                const index = children.findIndex(d => d.id === data.id);
                children.splice(index, 1);
            },

            renderContent(h, { node, data, store }) {
                return (
                    <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
                    <span>
                    <span>{node.label}</span>
                </span>
                <span>
                <el-button style="font-size: 12px;" type="text" on-click={ () => this.append(data) }>添加</el-button>
                <el-button style="font-size: 12px;" type="text" on-click={ () => this.remove(node, data) }>删除</el-button>
                </span>
                </span>);
            },

            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            }
        }
    };
</script>